export const toPercent = (x: number, y: number) => {
  return parseInt(((y / x) * 100).toFixed(0));
};
