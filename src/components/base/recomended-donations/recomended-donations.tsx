import React from 'react';

import { useTranslations, useMessages } from 'next-intl';

import { SimpleGrid, Text } from '@mantine/core';

import styles from './recomended-donations.module.scss';
import { IWishlistJoinProfile } from '@/types/database.types';
import { DontaionCard } from './donation-card/donation-card';
import { DonationsPagination } from './pagination/pagination';

interface IRecomendedDonationsProps {
  donations: IWishlistJoinProfile[] | null;
  totalPages: number;
}

export const RecomendedDonations: React.FC<IRecomendedDonationsProps> = ({
  donations,
  totalPages,
}) => {
  const t = useTranslations('HomePage');
  const messages = useMessages();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Text size='xxl' fw='bold'>
          Активні збори
        </Text>
      </div>
      <div className={styles.wrapper}>
        {donations && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 3 }}>
            {donations.map((donation) => (
              <DontaionCard donation={donation} key={donation.id} />
            ))}
          </SimpleGrid>
        )}
        <DonationsPagination totalPages={totalPages} />
      </div>
    </div>
  );
};
