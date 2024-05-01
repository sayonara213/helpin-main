import React from 'react';

import styles from './birth-date.module.scss';

import { Text } from '@mantine/core';
import { IconCake } from '@tabler/icons-react';
import { useLocale } from 'next-intl';

interface IBirthDateProps extends React.HTMLAttributes<HTMLDivElement> {
  birthDate: string | null;
}

export const BirthDate: React.FC<IBirthDateProps> = ({ birthDate, ...props }) => {
  const locale = useLocale();

  const localeString = locale === 'en' ? 'en-GB' : locale;

  const formattedDate = birthDate
    ? new Date(birthDate!).toLocaleDateString(localeString, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Set your birthday';

  return (
    <div className={styles.birthday} {...props}>
      <IconCake color='var(--color-text-secondary)' />
      <Text fw='bold'>{formattedDate}</Text>
    </div>
  );
};
