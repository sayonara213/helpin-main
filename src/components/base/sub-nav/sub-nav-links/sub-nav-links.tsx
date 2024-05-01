import React from 'react';

import Link from 'next/link';

import styles from './sub-nav-links.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { BirthDate } from '@/components/ui/birth-date/birth-date';
import { TProfile } from '@/types/database.types';

interface ISubNavLinksProps {
  profile: TProfile;
}

export const SubNavLinks: React.FC<ISubNavLinksProps> = ({ profile }) => {
  return (
    <Link href={'/profile'} className={styles.wrapper}>
      <BirthDate birthDate={profile.date_of_birth} />
      <Avatar src={profile.avatar_url!} size={36} />
    </Link>
  );
};
