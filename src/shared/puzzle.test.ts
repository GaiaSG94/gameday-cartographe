import assert from 'node:assert/strict';
import { test } from 'node:test';

import { countSolutions, dailySeed, generateMap, isCorrectMap, clueHolds } from './puzzle.ts';

test('seed deterministe', () => {
  assert.equal(dailySeed('2026-12-01'), dailySeed('2026-12-01'));
});

test('la carte du jour est deterministe et unique', () => {
  const a = generateMap('2026-12-01');
  const b = generateMap('2026-12-01');
  assert.deepEqual(a.cells, b.cells);
  assert.deepEqual(a.clues, b.clues);
  assert.equal(countSolutions(a.clues, a.cells), 1);
});

test('la solution verifie tous les indices', () => {
  for (const day of ['2026-12-01', '2026-12-06', '2026-12-09']) {
    const puzzle = generateMap(day);
    const solution = {
      lighthouse: puzzle.cells[0] ?? 0,
      mill: puzzle.cells[1] ?? 0,
      well: puzzle.cells[2] ?? 0,
      tower: puzzle.cells[3] ?? 0,
    };
    assert.ok(puzzle.clues.every((clue) => clueHolds(clue, solution)), day);
    assert.ok(isCorrectMap(puzzle, solution), day);
  }
});

test('un placement errone est rejete', () => {
  const puzzle = generateMap('2026-12-01');
  const wrong = {
    lighthouse: puzzle.cells[1] ?? 1,
    mill: puzzle.cells[0] ?? 0,
    well: puzzle.cells[2] ?? 2,
    tower: puzzle.cells[3] ?? 3,
  };
  assert.equal(isCorrectMap(puzzle, wrong), false);
});
