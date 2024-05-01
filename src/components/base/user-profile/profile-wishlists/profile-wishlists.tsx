import React from 'react';

import { cookies } from 'next/headers';

import styles from './profile-wishlists.module.scss';

import { WishlistsList } from '../../user-wishlists/user-wishlists-list/user-wishlists-list';

import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Text } from '@mantine/core';

interface ProfileWishlistsProps {
  profile: TProfile;
}

const ProfileWishlists: React.FC<ProfileWishlistsProps> = async ({ profile }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: wishlists } = await supabase
    .from('wishlists')
    .select()
    .eq('owner_id', profile.id)
    .eq('is_shared', false);

  return (
    <div className={styles.wrapper}>
      <Text size='md'>{profile.full_name}&apos;s wishlists:</Text>
      {wishlists && <WishlistsList wishlists={wishlists} />}
    </div>
  );
};

export default ProfileWishlists;
