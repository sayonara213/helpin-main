'use client';

import React, { useState } from 'react';

import { ProfileAvatar } from './avatar/avatar';
import { ProfileForm } from './profile-form/profile-form';
import styles from './profile.module.scss';

import { BirthDate } from '@/components/ui/birth-date/birth-date';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Button, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { notify } from '@/utils/toast';

interface IProfileProps {
  profile: TProfile;
}

export const Profile: React.FC<IProfileProps> = ({ profile }) => {
  const [profileState, setProfileState] = useState<TProfile>(profile);

  const supabase = createClientComponentClient<Database>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <ProfileAvatar supabase={supabase} profile={profileState} setProfile={setProfileState} />
      </div>

      <div className={styles.usernameWrapper}>
        <Text size='lg'>{profileState.full_name}</Text>
        {profileState.user_name && (
          <Text c={'dimmed'} size='sm'>
            @{profileState.user_name}
          </Text>
        )}
        <BirthDate birthDate={profileState.date_of_birth} style={{ marginTop: 12 }} />
      </div>
      <ProfileForm supabase={supabase} profile={profileState} setProfile={setProfileState} />
    </div>
  );
};
