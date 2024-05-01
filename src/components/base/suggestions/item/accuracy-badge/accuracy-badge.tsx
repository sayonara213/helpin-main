import { Badge } from '@mantine/core';
import { IconFlame } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface IAccuracyBadgeProps {
  accuracy: number;
}

export const AccuracyBadge: React.FC<IAccuracyBadgeProps> = ({ accuracy }) => {
  const t = useTranslations('WishlistPage.suggestions');

  const accuracyColor =
    accuracy > 0.8
      ? '#64aa50'
      : accuracy > 0.6
        ? '#43b3c6'
        : accuracy > 0.4
          ? '#cd8930'
          : '#d73939';
  return (
    <Badge color={accuracyColor}>
      {t('accuracy')}: {accuracy}
    </Badge>
  );
};
