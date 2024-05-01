import React from 'react';

import Link from 'next/link';

import styles from './user-search-item.module.scss';

import { useAuth } from '@/components/base/provider/auth-provider';
import { Avatar } from '@/components/ui/avatar/avatar';
import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';
import { notify } from '@/utils/toast';

import { Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface INavbarUserSearchItemProps {
  profile: TProfile;
  isFriend?: boolean;
  closeNav?: () => void;
}

export const NavbarUserSearchItem: React.FC<INavbarUserSearchItemProps> = ({
  profile,
  isFriend = false,
  closeNav,
}) => {
  const supabase = createClientComponentClient<Database>();
  const user = useAuth();

  const handleAddFriend = async () => {
    const { error } = await supabase.from('friendships').insert([
      {
        user_id: user.id,
        friend_id: profile.id,
      },
    ]);

    if (error) {
      notify('error', 'You already sent a friend request to this user');
      return;
    }

    notify('success', 'Friend request sent');
  };

  return (
    <div className={styles.item}>
      <Link href={`/profile/${profile.id}`} onClick={closeNav} className={styles.info}>
        <Avatar src={profile.avatar_url!} size={36} />
        <div className={styles.col}>
          <Text size='sm' truncate>
            {profile.full_name}
          </Text>
          {profile.user_name && (
            <Text size='xs' c='dimmed' truncate>
              @{profile.user_name}
            </Text>
          )}
        </div>
      </Link>
      {!isFriend && <CustomIcon name='heart' onClick={handleAddFriend} />}
    </div>
  );
};
