'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLock, IconSortAscending, IconStar } from '@tabler/icons-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/glow.module.scss';

export const FilterPersonal = () => {
  const [personal, setPersonal] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSwitch = () => {
    setPersonal(!personal);
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
    params.delete('verified');
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  useEffect(() => {
    updateSearchQuery({ personal: personal ? 'true' : '' });
  }, [personal]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const personalQuery = params.get('personal');
    setPersonal(personalQuery === 'true');
  }, []);

  return (
    <Tooltip label='Мої збори'>
      <ActionIcon
        variant='gradient'
        gradient={{ from: personal ? '#26428a' : '#373881', to: personal ? '#11aaaa' : '#2d5c7f' }}
        onClick={handleSwitch}
        className={personal ? styles.glowBlue : ''}
      >
        <IconLock size={20} color='white' />
      </ActionIcon>
    </Tooltip>
  );
};
