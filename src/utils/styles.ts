export const classes = (...cls: unknown[]): string => {
  return cls.filter((cl): cl is string => typeof cl === 'string').join(' ');
};
