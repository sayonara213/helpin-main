import { MantineThemeOverride } from '@mantine/core';

export const themeMantine: MantineThemeOverride = {
  primaryColor: 'accent',
  primaryShade: { light: 6, dark: 6 },
  colors: {
    accent: [
      '#f4f3ff',
      '#deede4',
      '#bfdbcc',
      '#94c1ab',
      '#4e9678',
      '#326953',
      '#285443',
      '#224337',
      '#1c382e',
      '#209255',
      '#12221d',
    ],
    dark: [
      '#ffffff',
      '#81f8ab',
      '#87c59b',
      '#4bb06e',
      '#29563c',
      '#16bb71',
      '#193428',
      '#193426',
      '#193426',
      '#0f1f1a',
    ],
  },
  fontSizes: {
    xxl: '1.75rem',
    xxxl: '2rem',
  },
};
