import React from 'react';

import { BirthdayListItem } from './birthday-list-item/birthday-list-item';
import styles from './birthday-list.module.scss';

import { TProfile } from '@/types/database.types';

interface IBirthdayListProps {
  friends: TProfile[];
  locale: string;
}

export const BirthdayList: React.FC<IBirthdayListProps> = ({ friends, locale }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {friends.map((friend) => (
          <BirthdayListItem friend={friend} key={friend.id} locale={locale} />
        ))}
      </div>
    </div>
  );
};
