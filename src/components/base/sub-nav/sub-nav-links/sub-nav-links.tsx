import React from 'react';

import Link from 'next/link';

import styles from './sub-nav-links.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { TProfile } from '@/types/database.types';
import { Paragraph } from '@/components/ui/text/text';

interface ISubNavLinksProps {
  profile: TProfile;
}

export const SubNavLinks: React.FC<ISubNavLinksProps> = ({ profile }) => {
  return (
    <Link href={'/profile'} className={styles.wrapper}>
      {profile.is_volunteer && (
        <Paragraph size='base' weight='medium' color='secondary'>
          (Volunteer{profile.is_verified && ' ⭐'})
        </Paragraph>
      )}
      <Paragraph size='base' weight='medium' color='default'>
        {profile.full_name}
      </Paragraph>
      <Avatar src={profile.avatar_url!} size={36} />
    </Link>
  );
};
