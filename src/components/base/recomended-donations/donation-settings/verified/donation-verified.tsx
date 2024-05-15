'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSortAscending, IconStar } from '@tabler/icons-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import styles from '@/styles/glow.module.scss';

export const DonationVerified = () => {
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSwitch = () => {
    setVerified(!verified);
  };

  const updateSearchQuery = (updatedQuery: any) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  useEffect(() => {
    verified && updateSearchQuery({ verified: verified ? 'true' : '' });
  }, [verified]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const verified = params.get('verified');
    setVerified(verified === 'true');
  }, []);

  return (
    <Tooltip label='Верифіковані волонтери'>
      <ActionIcon
        variant='gradient'
        gradient={{
          from: verified ? '#c6bb26' : '#969257',
          to: verified ? '#b3901d' : '#aa8f5e',
        }}
        onClick={handleSwitch}
        className={verified ? styles.glowYellow : ''}
      >
        <IconStar size={20} color='white' />
      </ActionIcon>
    </Tooltip>
  );
};
