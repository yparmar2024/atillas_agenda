// Product defaults, kept separate from user-owned data.
export const appConfig = {
  timerPresets: [5, 10, 15],
  taskCategories: ['Personal', 'School', 'Work', 'Other'],
  rewards: { task: 10, perMinute: 1 },
};

export const sessionReward = (seconds: number) =>
  Math.floor(seconds / 60) * appConfig.rewards.perMinute;
