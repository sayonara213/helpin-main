'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { ToolbarDelete } from './toolbar-delete/toolbar-delete';
import { ToolbarEdit } from './toolbar-edit/toolbar-edit';
import { ToolbarLastSeen } from './toolbar-last-seen/last-seen';
import { ToolbarSort } from './toolbar-sort/toolbar-sort';
import { ToolbarTitle } from './toolbar-title/toolbar-title';
import styles from './toolbar.module.scss';

import { useSharedWishlist } from '../../provider/shared-wishlist-provider';
import { useWishlist } from '../../provider/wishlist-provider';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Skeleton, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const WishlistToolbar: React.FC = () => {
  const { isEditing, setIsEditing, isOwnWishlist, wishlist } = useWishlist();
  const { isFriendOnline } = useSharedWishlist();

  const [profile, setProfile] = useState<TProfile | null>(null);

  const supabase = createClientComponentClient<Database>();

  const fetchProfile = useCallback(async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', wishlist.owner_id)
      .single();

    if (error || !data) {
      return;
    }

    setProfile(data);
  }, [wishlist, supabase]);

  useEffect(() => {
    if (!isOwnWishlist) {
      fetchProfile();
    }
  }, [wishlist]);

  const RenderToolbarItems = () => (
    <>
      <ToolbarSort />
      {isOwnWishlist && <ToolbarEdit isEditing={isEditing} setIsEditing={setIsEditing} />}
      {isOwnWishlist && <ToolbarDelete />}
    </>
  );

  const RenderProfileSection = () => (
    <div className={styles.profile}>
      {profile ? (
        <>
          <Avatar src={profile?.avatar_url} size={36} />
          <Text>{profile.full_name}</Text>
          <ToolbarLastSeen isOnline={isFriendOnline} />
        </>
      ) : (
        <>
          <Skeleton height={36} width={36} radius='100%' />
          <Skeleton height={16} width={100} radius='sm' />
        </>
      )}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {!wishlist.is_shared && <ToolbarTitle />}

      {!isOwnWishlist ? (
        <div className={styles.pair}>
          <RenderProfileSection />
          {!wishlist.is_shared && <RenderToolbarItems />}
        </div>
      ) : (
        <div className={styles.pair}>
          <RenderToolbarItems />
        </div>
      )}
    </div>
  );
};
