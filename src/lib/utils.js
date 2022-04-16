export const createClassName = (classes) =>
  classes.reduce(
    (acc, val, index) => (index !== 0 ? acc.concat(`-${val}`) : val),
    ""
  );

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
