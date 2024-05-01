import React from 'react';

import Link from 'next/link';

import styles from './profile-wishlists-item.module.scss';

import { TWishlist } from '@/types/database.types';

interface IProfileWishlistsItemProps {
  wishlist: TWishlist;
}

export const ProfileWishlistsItem: React.FC<IProfileWishlistsItemProps> = ({ wishlist }) => {
  return (
    <Link href={`/wishlist/${wishlist.id}`} className={styles.wrapper}>
      <h2>{wishlist.title}</h2>
      <p>{new Date(wishlist.created_at).toDateString()}</p>
    </Link>
  );
};
