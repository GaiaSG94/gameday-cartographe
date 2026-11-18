export type Landmark = 'lighthouse' | 'mill' | 'well' | 'tower';

export type Clue =
  | { kind: 'northOf'; a: Landmark; b: Landmark }
  | { kind: 'sameRow'; a: Landmark; b: Landmark }
  | { kind: 'adjacent'; a: Landmark; b: Landmark }
  | { kind: 'notCol'; a: Landmark; col: number }
  | { kind: 'notRow'; a: Landmark; row: number };

export type MapPuzzle = {
  day: string;
  clues: Clue[];
  landmarks: Landmark[];
  cells: number[];
};

export const SIZE = 4;
export const LANDMARKS: Landmark[] = ['lighthouse', 'mill', 'well', 'tower'];

export const dayKeyUTC = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

export const dailySeed = (day: string): number => {
  let hash = 2166136261;
  const input = 'cartographe:' + day;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const rowOf = (cell: number): number => Math.floor(cell / SIZE);
export const colOf = (cell: number): number => cell % SIZE;

const cellsOf = (placements: Record<Landmark, number>, a: Landmark): number =>
  placements[a] ?? 0;

const adjacent = (c1: number, c2: number): boolean =>
  Math.abs(rowOf(c1) - rowOf(c2)) <= 1 && Math.abs(colOf(c1) - colOf(c2)) <= 1 &&
  !(rowOf(c1) === rowOf(c2) && colOf(c1) === colOf(c2));

export const clueHolds = (clue: Clue, placements: Record<Landmark, number>): boolean => {
  const at = (a: Landmark): number => cellsOf(placements, a);
  const rA = rowOf(at(clue.a));
  const cA = colOf(at(clue.a));
  switch (clue.kind) {
    case 'northOf': {
      const rB = rowOf(at(clue.b));
      const cB = colOf(at(clue.b));
      return cA === cB && rA < rB;
    }
    case 'sameRow':
      return rA === rowOf(at(clue.b));
    case 'adjacent':
      return adjacent(at(clue.a), at(clue.b));
    case 'notCol':
      return cA !== clue.col;
    case 'notRow':
      return rA !== clue.row;
  }
};

export const countSolutions = (clues: Clue[], cells: number[]): number => {
  const perms = permutations(LANDMARKS);
  let total = 0;
  for (const perm of perms) {
    const placements: Record<Landmark, number> = {
      lighthouse: cells[0] ?? 0,
      mill: cells[1] ?? 0,
      well: cells[2] ?? 0,
      tower: cells[3] ?? 0,
    };
    perm.forEach((lm, i) => {
      placements[lm] = cells[i] ?? 0;
    });
    if (clues.every((clue) => clueHolds(clue, placements))) total++;
  }
  return total;
};

const permutations = (items: Landmark[]): Landmark[][] => {
  if (items.length <= 1) return [items];
  const out: Landmark[][] = [];
  items.forEach((item, i) => {
    const rest = items.filter((_, j) => j !== i);
    permutations(rest).forEach((p) => out.push([item, ...p]));
  });
  return out;
};

const randomClue = (rand: () => number, placements: Record<Landmark, number>): Clue => {
  const a = LANDMARKS[Math.floor(rand() * LANDMARKS.length)] ?? 'lighthouse';
  const b = LANDMARKS[Math.floor(rand() * LANDMARKS.length)] ?? 'mill';
  const kind = Math.floor(rand() * 5);
  if (kind === 0 && a !== b) return { kind: 'northOf', a, b };
  if (kind === 1 && a !== b) return { kind: 'sameRow', a, b };
  if (kind === 2 && a !== b) return { kind: 'adjacent', a, b };
  if (kind === 3) return { kind: 'notCol', a, col: (colOf(cellsOf(placements, a)) + 1 + Math.floor(rand() * 3)) % SIZE };
  return { kind: 'notRow', a, row: (rowOf(cellsOf(placements, a)) + 1 + Math.floor(rand() * 3)) % SIZE };
};

export const generateMap = (day: string): MapPuzzle => {
  const rand = mulberry32(dailySeed(day));
  const all = Array.from({ length: SIZE * SIZE }, (_, i) => i).sort(() => rand() - 0.5);
  const cells = all.slice(0, LANDMARKS.length);
  const solution: Record<Landmark, number> = {
    lighthouse: cells[0] ?? 0,
    mill: cells[1] ?? 0,
    well: cells[2] ?? 0,
    tower: cells[3] ?? 0,
  };
  const clues: Clue[] = [];
  let count = countSolutions(clues, cells);
  for (let round = 0; round < 60 && count > 1; round++) {
    let best: Clue | null = null;
    let bestCount = count;
    for (let trial = 0; trial < 12; trial++) {
      const candidate = randomClue(rand, solution);
      if (!clueHolds(candidate, solution)) continue;
      if (clues.some((clue) => JSON.stringify(clue) === JSON.stringify(candidate))) continue;
      const next = countSolutions([...clues, candidate], cells);
      if (next >= 1 && next < bestCount) {
        best = candidate;
        bestCount = next;
        if (next === 1) break;
      }
    }
    if (!best) break;
    clues.push(best);
    count = bestCount;
  }
  return { day, clues, landmarks: LANDMARKS, cells };
};

export const isCorrectMap = (puzzle: MapPuzzle, placements: Record<Landmark, number>): boolean =>
  LANDMARKS.every((lm, i) => cellsOf(placements, lm) === (puzzle.cells[i] ?? -1));

export const clueText = (clue: Clue): string => {
  const name = (lm: Landmark): string => lm;
  switch (clue.kind) {
    case 'northOf':
      return `The ${name(clue.a)} stands north of the ${name(clue.b)} (same column).`;
    case 'sameRow':
      return `The ${name(clue.a)} shares a row with the ${name(clue.b)}.`;
    case 'adjacent':
      return `The ${name(clue.a)} is adjacent to the ${name(clue.b)}.`;
    case 'notCol':
      return `The ${name(clue.a)} is not in column ${clue.col + 1}.`;
    case 'notRow':
      return `The ${name(clue.a)} is not in row ${clue.row + 1}.`;
  }
};
