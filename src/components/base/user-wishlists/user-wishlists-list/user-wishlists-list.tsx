import React from 'react';

import { WishlistsItem } from './item/wishlists-item';
import styles from './user-wishlists-list.module.scss';

import { TWishlist } from '@/types/database.types';
import { NextIntlClientProvider, useLocale } from 'next-intl';

interface IWishlistsListProps {
  wishlists: TWishlist[];
}

export const WishlistsList: React.FC<IWishlistsListProps> = ({ wishlists }) => {
  const locale = useLocale();

  return (
    <ul className={styles.list}>
      {wishlists?.map((wishlist) => (
        <WishlistsItem wishlist={wishlist} key={wishlist.id} locale={locale} />
      ))}
    </ul>
  );
};
