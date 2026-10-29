import { describe, expect, it } from 'vitest';
import { sessionReward } from './config';

describe('session rewards', () => {
  it.each([
    [0, 0],
    [59, 0],
    [60, 1],
    [119, 1],
    [900, 15],
  ])('awards %i seconds as %i points', (seconds, points) => {
    expect(sessionReward(seconds)).toBe(points);
  });
});
