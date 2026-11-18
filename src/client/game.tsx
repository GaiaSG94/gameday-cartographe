import './index.css';

import { useCallback, useEffect, useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { clueText } from '../shared/puzzle';
import type { Clue, Landmark } from '../shared/puzzle';

type Init = {
  day: string;
  username: string;
  streak: number;
  solvedToday: boolean;
  startedAt: number;
  size: number;
  clues: Clue[];
  landmarks: Landmark[];
};

type Result = { won: boolean; streak: number; elapsedMs: number };

const ICONS: Record<Landmark, string> = {
  lighthouse: '🗼',
  mill: '🌾',
  well: '🕳️',
  tower: '⛰️',
};

const App = () => {
  const [init, setInit] = useState<Init | null>(null);
  const [placements, setPlacements] = useState<Record<string, number>>({});
  const [active, setActive] = useState<Landmark>('lighthouse');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/init');
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setInit(data);
      setPlacements({});
      setActive(data.landmarks[0] ?? 'lighthouse');
      setResult(null);
      setSeconds(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'load failed');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const place = (cell: number) => {
    setPlacements((current) => {
      const next = { ...current };
      for (const key of Object.keys(next)) {
        if (next[key] === cell) delete next[key];
      }
      next[active] = cell;
      return next;
    });
    const index = (init?.landmarks ?? []).indexOf(active);
    const nextLm = init?.landmarks[(index + 1) % (init?.landmarks.length ?? 1)] ?? 'lighthouse';
    setActive(nextLm);
  };

  const submit = async () => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placements, startedAt: Date.now() - seconds * 1000 }),
      });
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'submit failed');
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2b2417] text-[#ead9b8]">
        <p>{error}</p>
      </div>
    );
  }
  if (!init) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2b2417] text-[#a2906c]">
        <p className="animate-pulse">Unrolling the map…</p>
      </div>
    );
  }

  const placed = Object.keys(placements).length;
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-[#2b2417] px-4 py-6 text-[#ead9b8]">
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-black tracking-[0.3em] text-[#d8b46a]">CARTOGRAPHE</h1>
        <div className="text-sm font-semibold text-[#a2906c]">
          <span className="mr-3">{clock}</span>
          <span>🔥 {result ? result.streak : init.streak}</span>
        </div>
      </header>
      <p className="max-w-md text-center text-[13px] leading-snug text-[#a2906c]">
        Pin the four landmarks so every note in the margin holds. Pick a landmark, then tap a
        free square.
      </p>
      <div className="flex w-full max-w-md flex-wrap justify-center gap-2">
        {init.landmarks.map((lm) => (
          <button
            key={lm}
            onClick={() => setActive(lm)}
            className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold capitalize ${
              active === lm
                ? 'border-[#d8b46a] bg-[#d8b46a] text-[#2b2417]'
                : 'border-[#4a3d27] bg-[#221c11] text-[#ead9b8]'
            }`}
          >
            {ICONS[lm]} {lm} {placements[lm] !== undefined ? '✓' : ''}
          </button>
        ))}
      </div>
      <div
        className="grid gap-1.5 rounded-xl border-2 border-[#4a3d27] bg-[#3a3122] p-3"
        style={{ gridTemplateColumns: `repeat(${init.size}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: init.size * init.size }, (_, cell) => {
          const occupant = init.landmarks.find((lm) => placements[lm] === cell);
          return (
            <button
              key={cell}
              onClick={() => place(cell)}
              className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-[#4a3d27] bg-[#2b2417] text-2xl"
              aria-label={`square ${cell + 1}`}
            >
              {occupant ? ICONS[occupant] : ''}
            </button>
          );
        })}
      </div>
      <ul className="w-full max-w-md space-y-1.5 rounded-xl border-2 border-[#4a3d27] bg-[#221c11] p-4 text-[13px]">
        {init.clues.map((clue, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#d8b46a] mt-1.5" />
            {clueText(clue)}
          </li>
        ))}
      </ul>
      {!result ? (
        <button
          onClick={() => void submit()}
          disabled={placed < init.landmarks.length}
          className="w-full max-w-md rounded-full bg-[#d8b46a] py-3 text-base font-black uppercase tracking-widest text-[#2b2417] transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          Ink the map ({placed}/{init.landmarks.length})
        </button>
      ) : (
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border-2 border-[#4a3d27] bg-[#221c11] p-5 text-center">
          <p className="text-2xl font-black tracking-widest">
            {result.won ? 'MAP SIGNED' : 'TERRITORY LOST'}
          </p>
          <p className="text-sm text-[#a2906c]">
            {result.won
              ? `Charted in ${clock} — streak 🔥 ${result.streak}. A new territory tomorrow.`
              : 'The landmarks do not match the margin notes. Redraw and try again.'}
          </p>
          <button
            onClick={() => setResult(null)}
            className="rounded-full border-2 border-[#d8b46a] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#d8b46a]"
          >
            Back to the map
          </button>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
