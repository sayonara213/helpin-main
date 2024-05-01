export const toNormalCase = (text: string) => {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const extractBaseDomain = (url: string) => {
  return new URL(url).hostname;
};
