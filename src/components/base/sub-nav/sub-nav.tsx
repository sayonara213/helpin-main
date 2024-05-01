import React from 'react';

import { SubNavLinks } from './sub-nav-links/sub-nav-links';
import styles from './sub-nav.module.scss';

import { TProfile } from '@/types/database.types';
import { toNormalCase } from '@/utils/text';
import { Button, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ISubNavProps {
  profile: TProfile;
}

export const SubNav: React.FC<ISubNavProps> = ({ profile }) => {
  const t = useTranslations('HomePage.subNav');

  return (
    <div className={styles.wrapper}>
      {profile && (
        <Text fw={'bold'} size='lg' className={styles.welcome}>
          {t('title', { name: toNormalCase(profile.full_name) })}
        </Text>
      )}
      {profile ? (
        <SubNavLinks profile={profile} />
      ) : (
        <Button component={Link} href={'/auth/sign-up'}>
          Login
        </Button>
      )}
    </div>
  );
};
