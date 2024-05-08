import React from 'react';

import { useTranslations, useMessages } from 'next-intl';

import { SimpleGrid, Text } from '@mantine/core';

import styles from './recomended-donations.module.scss';
import { TWishlist } from '@/types/database.types';
import { DontaionCard } from './donation-card/donation-card';

interface IRecomendedDonationsProps {
  donations: TWishlist[] | null;
}

export const RecomendedDonations: React.FC<IRecomendedDonationsProps> = ({ donations }) => {
  const t = useTranslations('HomePage');
  const messages = useMessages();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Text size='xxl' fw='bold'>
          {t('wishlists.title')}
        </Text>
      </div>
      {donations && (
        <SimpleGrid cols={3}>
          {donations.map((donation) => (
            <DontaionCard donation={donation} key={donation.id} />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};
