'use client';

import React, { useCallback, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import styles from './donation-filtration.module.scss';

import { ActionIcon, Menu, MenuDropdown, MenuItem, Text, Tooltip } from '@mantine/core';
import {
  IconCalendar,
  IconSortAscending,
  IconTextGrammar,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const DonationFiltration: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('WishlistPage.toolbar.sort');

  const sortOptions = [
    {
      value: 'date',
      label: t('sortBy.priority'),
      icon: <IconCalendar color='var(--text-color)' size={20} />,
    },
    {
      value: 'title',
      label: t('sortBy.name'),
      icon: <IconTextGrammar color='var(--text-color)' size={20} />,
    },
  ];

  const orderOptions = [
    {
      value: 'asc',
      label: t('sortOrder.asc'),
      icon: <IconTrendingUp color='var(--text-color)' size={20} />,
    },
    {
      value: 'desc',
      label: t('sortOrder.desc'),
      icon: <IconTrendingDown color='var(--text-color)' size={20} />,
    },
  ];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const setQuery = (key: string, value: string, label: string) => {
    router.push(pathname + '?' + createQueryString(key, value.toLowerCase()));
  };

  const sort = searchParams.get('sort') || 'priority';
  const order = searchParams.get('order') || 'asc';

  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      <Menu.Target>
        <Tooltip label='Сортування'>
          <ActionIcon variant='gradient' gradient={{ from: '#6a00ff', to: '#ae00ff' }}>
            <IconSortAscending size={20} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <MenuDropdown className={styles.dropdown}>
        <Menu.Label>{t('sortBy.title')}</Menu.Label>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              setQuery('sort', option.value, option.label);
            }}
            className={option.value === sort ? styles.selected : ''}
            leftSection={option.icon}
          >
            {option.label}
          </MenuItem>
        ))}
        <Menu.Divider />
        <Menu.Label>{t('sortOrder.title')}</Menu.Label>
        {orderOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => setQuery('order', option.value, '')}
            leftSection={option.icon}
            className={option.value === order ? styles.selected : ''}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  );
};
