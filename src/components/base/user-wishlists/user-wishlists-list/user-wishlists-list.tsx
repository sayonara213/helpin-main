import React from 'react';

import { SharedWishlistsItem } from './item/shared-wishlist-item';
import { WishlistsItem } from './item/wishlists-item';
import styles from './user-wishlists-list.module.scss';

import { ISharedWishlistJoinProfile, TWishlist } from '@/types/database.types';
import { NextIntlClientProvider, useLocale } from 'next-intl';

interface IWishlistsListProps {
  wishlists: (TWishlist | ISharedWishlistJoinProfile)[];
}

export const WishlistsList: React.FC<IWishlistsListProps> = ({ wishlists }) => {
  const locale = useLocale();

  return (
    <ul className={styles.list}>
      {wishlists?.map((wishlist) =>
        'friendship_id' in wishlist ? (
          <SharedWishlistsItem wishlist={wishlist} key={wishlist.id} locale={locale} />
        ) : (
          <WishlistsItem wishlist={wishlist} key={wishlist.id} locale={locale} />
        ),
      )}
    </ul>
  );
};
