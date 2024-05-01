import React from 'react';

import styles from './friends-item.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { TProfile } from '@/types/database.types';

import { Text } from '@mantine/core';

interface IFriendsItemProps {
  profile: TProfile;
  onClick?: (profile: TProfile) => void;
}

export const FriendsItem: React.FC<IFriendsItemProps> = ({ profile, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(profile);
    }
  };

  return (
    <div className={styles.item} onClick={handleClick}>
      <div className={styles.info}>
        <Avatar src={profile.avatar_url!} size={36} />
        <div className={styles.col}>
          <Text size='sm' className={styles.name} truncate>
            {profile.full_name}
          </Text>
          {profile.user_name && (
            <Text size='xs' c='dimmed' truncate>
              @{profile.user_name}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};
