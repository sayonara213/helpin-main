import React from 'react';

import { WishlistsList } from './user-wishlists-list/user-wishlists-list';
import styles from './user-wishlists.module.scss';

import { ISharedWishlistJoinProfile, TWishlist } from '@/types/database.types';

import { Text } from '@mantine/core';

import { CreateWishlistButton } from './create-wishlist-button/create-wishlist-button';
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import { pick } from 'lodash';

interface IUserWishlistsProps {
  wishlists: (TWishlist | ISharedWishlistJoinProfile)[] | null;
}

export const UserWishlists: React.FC<IUserWishlistsProps> = ({ wishlists }) => {
  const t = useTranslations('HomePage');
  const messages = useMessages();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Text size='xxl' fw='bold'>
          {t('wishlists.title')}
        </Text>
        <NextIntlClientProvider messages={pick(messages, 'HomePage', 'Navigation.users', 'Common')}>
          <CreateWishlistButton modalTitle={t('create.title')} />
        </NextIntlClientProvider>
      </div>
      <div className={styles.list}>{wishlists && <WishlistsList wishlists={wishlists} />}</div>
    </div>
  );
};
