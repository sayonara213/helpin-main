'use server';

import React from 'react';

import styles from './profile-info.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { BirthDate } from '@/components/ui/birth-date/birth-date';
import { TProfile } from '@/types/database.types';
import { Text } from '@mantine/core';

interface IProfileInfoProps {
  profile: TProfile;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Avatar size={128} src={profile.avatar_url} className={styles.avatar} />
      <div>
        <Text size='md'>{profile.full_name}</Text>
        {profile.user_name && (
          <Text size={'sm'} c='dimmed'>
            @{profile.user_name}
          </Text>
        )}
      </div>
      <BirthDate birthDate={profile.date_of_birth} />
      {profile.bio && <Text className={styles.bio}>{profile.bio}</Text>}
    </div>
  );
};

export default ProfileInfo;
