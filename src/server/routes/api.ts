import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import { dayKeyUTC, generateMap, isCorrectMap, LANDMARKS } from '../../shared/puzzle';
import type { Context } from 'hono';
import type { Landmark } from '../../shared/puzzle';
import type { ErrorResponse } from '../../shared/api';

export const api = new Hono();

const DAY_MS = 24 * 60 * 60 * 1000;

const yesterdayKeyUTC = (): string => dayKeyUTC(new Date(Date.now() - DAY_MS));

const readStreak = async (username: string): Promise<number> => {
  const [streakRaw, lastDayRaw] = await Promise.all([
    redis.get(`streak:${username}`),
    redis.get(`lastday:${username}`),
  ]);
  const streak = streakRaw ? parseInt(streakRaw, 10) : 0;
  return lastDayRaw === yesterdayKeyUTC() ? streak : 0;
};

const error = (c: Context, message: string): Response =>
  c.json<ErrorResponse>({ status: 'error', message }, 400);

const handleInit = async (c: Context): Promise<Response> => {
  const { postId } = context;
  if (!postId) return error(c, 'postId is required');
  try {
    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    const day = dayKeyUTC();
    const puzzle = generateMap(day);
    const [solvedRaw, streak] = await Promise.all([
      redis.get(`solved:${username}:${day}`),
      readStreak(username),
    ]);
    return c.json({
      type: 'init',
      day,
      username,
      streak,
      solvedToday: solvedRaw === '1',
      startedAt: Date.now(),
      size: 4,
      clues: puzzle.clues,
      landmarks: puzzle.landmarks,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return error(c, `init failed: ${message}`);
  }
};

const handleSubmit = async (c: Context): Promise<Response> => {
  const { postId } = context;
  if (!postId) return error(c, 'postId is required');
  const body = await c.req.json<{ placements?: Record<string, number>; startedAt?: number }>();
  const day = dayKeyUTC();
  const puzzle = generateMap(day);
  const raw = body.placements ?? {};
  const placements: Record<Landmark, number> = {
    lighthouse: raw.lighthouse ?? -1,
    mill: raw.mill ?? -1,
    well: raw.well ?? -1,
    tower: raw.tower ?? -1,
  };
  const cells = Object.values(placements);
  const valid =
    cells.every((v) => v >= 0 && v < 16) && new Set(cells).size === LANDMARKS.length;
  const won = Boolean(valid) && isCorrectMap(puzzle, placements);
  const elapsedMs = typeof body.startedAt === 'number' ? Date.now() - body.startedAt : 0;
  let streak = 0;
  if (won) {
    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    streak = (await readStreak(username)) + 1;
    await Promise.all([
      redis.set(`streak:${username}`, String(streak)),
      redis.set(`lastday:${username}`, day),
      redis.set(`solved:${username}:${day}`, '1'),
    ]);
  }
  return c.json({ type: 'submit', won, streak, elapsedMs });
};

api.get('/init', handleInit);
api.post('/submit', handleSubmit);
