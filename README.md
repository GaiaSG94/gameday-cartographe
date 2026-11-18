# Cartographe

A daily spatial-deduction game for Reddit, built on [Devvit Web](https://developers.reddit.com/).

Every day a blank 4x4 chart and four landmarks (lighthouse, mill, well, tower).
The margin notes give directional clues - "the lighthouse stands north of the
mill", "the well is not in column 3" - and the puzzle is generated so the
placement is unique.

## How to play

1. Pick a landmark from the palette.
2. Tap a free square to pin it.
3. When the four are placed, **Ink the map**.

One chart per day, the same for everyone; streaks stored per user in Redis.

## Stack

- React 19 + Tailwind 4 + Vite (client inside a Reddit post)
- Hono server on Devvit (`/api/init`, `/api/submit`), Redis persistence
- Deterministic daily generation (UTC seed), uniqueness brute-forced (24 layouts),
  unit-tested

## Development

```bash
npm install
npm run dev
npm test
npm run type-check
npm run build
```

## Submission (Reddit'"'"'s Game of the Day Hackathon)

- App listing: `developers.reddit.com/apps/gameday-cartographe` (private until judging ends)
- Demo post: public test subreddit, post running the game
