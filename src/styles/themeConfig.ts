import { MantineThemeOverride } from '@mantine/core';

export const themeMantine: MantineThemeOverride = {
  primaryColor: 'accent',
  primaryShade: { light: 6, dark: 8 },
  colors: {
    accent: [
      '#f4f3ff',
      '#eceafd',
      '#dcd7fd',
      '#c1b7fb',
      '#a18ef7',
      '#8460f2',
      '#7745e9',
      '#632dd4',
      '#5325b2',
      '#462092',
      '#2a1263',
    ],
    dark: [
      '#ffffff',
      '#9181f8',
      '#9a87c5',
      '#694bb0',
      '#372956',
      '#4816bb',
      '#211934',
      '#211934',
      '#221047',
      '#090416',
    ],
  },
  fontSizes: {
    xxl: '1.75rem',
    xxxl: '2rem',
  },
};
