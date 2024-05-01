'use client';

import React, { useCallback, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import styles from '../toolbar.module.scss';

import { toNormalCase } from '@/utils/text';

import { ActionIcon, Button, Menu, MenuDropdown, MenuItem, Text } from '@mantine/core';
import {
  IconCalendar,
  IconMoneybag,
  IconSortAscending,
  IconStar,
  IconTextGrammar,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const ToolbarSort: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('WishlistPage.toolbar.sort');

  const sortOptions = [
    {
      value: 'priority',
      label: t('sortBy.priority'),
      icon: <IconStar color='var(--text-color)' size={20} />,
    },
    {
      value: 'name',
      label: t('sortBy.name'),
      icon: <IconTextGrammar color='var(--text-color)' size={20} />,
    },
    {
      value: 'price',
      label: t('sortBy.price'),
      icon: <IconMoneybag color='var(--text-color)' size={20} />,
    },
    {
      value: 'created_at',
      label: t('sortBy.date'),
      icon: <IconCalendar color='var(--text-color)' size={20} />,
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
        <ActionIcon variant='gradient' gradient={{ from: '#6a00ff', to: '#ae00ff' }}>
          <IconSortAscending size={20} />
        </ActionIcon>
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
