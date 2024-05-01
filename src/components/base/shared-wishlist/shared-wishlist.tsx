'use client';

import React from 'react';

import SharedWishlistProvider from '../provider/shared-wishlist-provider';
import { ToolbarSharedTitle } from '../wishlist/toolbar/toolbar-shared-title/toolbar-shared-title';

import { TSharedWishlist, TWishlist } from '@/types/database.types';
import { useTrackOnline } from '@/hooks/use-track-online';

interface ISharedWishlistProps {
  sharedWishlist: TSharedWishlist;
  wishlistOne: TWishlist;
  wishlistTwo: TWishlist;
  userId: string;
  children: React.ReactNode;
}

export const SharedWishlist: React.FC<ISharedWishlistProps> = ({
  sharedWishlist,
  wishlistOne,
  wishlistTwo,
  userId,
  children,
}) => {
  const friendWishlist = userId === wishlistOne.owner_id ? wishlistTwo : wishlistOne;

  const isOnline = useTrackOnline(sharedWishlist.id, userId, friendWishlist.owner_id);

  return (
    <SharedWishlistProvider sharedWishlist={sharedWishlist} isFriendOnline={isOnline}>
      <ToolbarSharedTitle />
      {children}
    </SharedWishlistProvider>
  );
};
