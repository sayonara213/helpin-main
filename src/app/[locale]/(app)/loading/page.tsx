'use client';

import React from 'react';

import { AppLoading } from '@/components/pages/loading/app/app-loading';
import { WishlistLoading } from '@/components/pages/loading/wishlist/wishlist-loading';
import { SharedWishlistLoading } from '@/components/pages/loading/shared-wishlist/shared-wishlist-loading';

const Loading = () => {
  return <SharedWishlistLoading />;
};

export default Loading;
