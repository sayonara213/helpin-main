'use client';

import React from 'react';

import styles from './profile-shared-wishlists.module.scss';

import { useAuth } from '@/components/base/provider/auth-provider';
import { Database } from '@/lib/schema';

import { Button } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface IProfileSharedWishlistsProps {
  profileId: string;
}

export const ProfileSharedWishlists: React.FC<IProfileSharedWishlistsProps> = ({ profileId }) => {
  const supabase = createClientComponentClient<Database>();
  const user = useAuth();

  const handleNewSharedWishlist = async () => {
    const { data: wishlistId, error } = await supabase.rpc('create_shared_wishlist', {
      user_id_one: user.id,
      user_id_two: profileId,
      shared_title: 'Shared Wishlist',
    });
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={handleNewSharedWishlist}>Create Shared Wishlist</Button>
    </div>
  );
};
