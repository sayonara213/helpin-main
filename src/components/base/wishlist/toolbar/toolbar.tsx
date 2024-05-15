'use client';

import React, { PropsWithChildren, ReactNode, useCallback, useEffect, useState } from 'react';

import { ToolbarDelete } from './toolbar-delete/toolbar-delete';
import { ToolbarEdit } from './toolbar-edit/toolbar-edit';
import { ToolbarSort } from './toolbar-sort/toolbar-sort';
import { ToolbarTitle } from './toolbar-title/toolbar-title';
import styles from './toolbar.module.scss';

import { useWishlist } from '../../provider/wishlist-provider';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Skeleton, Spoiler, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Paragraph } from '@/components/ui/text/text';
import { Monobank } from '@/components/ui/monobank/monobank';
import { ToolbarChat } from './toolbar-chat/toolbar-chat';
import { ToolbarShare } from './toolbar-share/toolbar-share';

interface IWishlistToolbarProps {
  children: React.ReactNode;
}

export const WishlistToolbar: React.FC<IWishlistToolbarProps> = ({ children }) => {
  const { isEditing, setIsEditing, isOwnWishlist, wishlist } = useWishlist();

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
      <ToolbarShare />
      <ToolbarChat />
    </>
  );

  const RenderProfileSection = () => (
    <div className={styles.profile}>
      {profile ? (
        <>
          <Avatar src={profile?.avatar_url} size={36} />
          <Text>{profile.full_name}</Text>
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ToolbarTitle />

        {!isOwnWishlist ? (
          <div className={styles.pair}>
            <RenderProfileSection />
            <RenderToolbarItems />
          </div>
        ) : (
          <div className={styles.pair}>
            <RenderToolbarItems />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <Spoiler maxHeight={60} showLabel='Показати більше' hideLabel='Сховати'>
          <Paragraph color='muted' className={styles.description}>
            {wishlist.description}
          </Paragraph>
        </Spoiler>
        {wishlist.monobank_url ? (
          <>{children}</>
        ) : (
          <div className={styles.monobank}>
            <Paragraph color='muted'>Monobank</Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};
