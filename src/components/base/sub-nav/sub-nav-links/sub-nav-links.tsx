import React from 'react';

import Link from 'next/link';

import styles from './sub-nav-links.module.scss';

import { Avatar } from '@mantine/core';
import { TProfile } from '@/types/database.types';
import { Paragraph } from '@/components/ui/text/text';
import { Flex } from '@mantine/core';

interface ISubNavLinksProps {
  profile: TProfile;
}

export const SubNavLinks: React.FC<ISubNavLinksProps> = ({ profile }) => {
  return (
    <Link href={'/profile'} className={styles.wrapper}>
      <Flex gap={8}>
        {profile.is_volunteer && (
          <Paragraph size='base' weight='medium' color='secondary'>
            (Volunteer{profile.is_verified && ' ⭐'})
          </Paragraph>
        )}
        <Paragraph size='base' weight='medium' color='default'>
          {profile.full_name}
        </Paragraph>
      </Flex>

      <Avatar src={profile.avatar_url!} size={36} variant='outline' />
    </Link>
  );
};
