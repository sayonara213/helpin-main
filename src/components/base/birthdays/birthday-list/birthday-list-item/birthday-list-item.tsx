import React from 'react';

import Link from 'next/link';

import styles from './birthday-list-item.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { TProfile } from '@/types/database.types';
import { formatBirthdayToNow } from '@/utils/date';
import { Text } from '@mantine/core';

interface IBirthdayListItemProps {
  friend: TProfile;
  locale: string;
}

export const BirthdayListItem: React.FC<IBirthdayListItemProps> = ({ friend, locale }) => {
  const birthDate = new Date(friend.date_of_birth);
  const distance = formatBirthdayToNow(birthDate.toDateString(), locale);

  return (
    <Link href={`/profile/${friend.id}`} className={styles.wrapper}>
      <div className={styles.pair}>
        <Avatar src={friend.avatar_url} size={36} />
        <Text size='sm'>{friend.full_name}</Text>
      </div>
      <Text size='sm' c='dimmed' ta={'right'}>
        {birthDate.toLocaleDateString()} ({distance})
      </Text>
    </Link>
  );
};
