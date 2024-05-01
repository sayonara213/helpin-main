import React from 'react';

import styles from './notifications.module.scss';

import { IFiriendshipProfile } from '@/types/database.types';

import { Text } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { NotificationsList } from './notifications-list/notifications-list';
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import { pick } from 'lodash';

interface INotificationsProps {
  friendships: IFiriendshipProfile[] | null;
}

export const Notifications: React.FC<INotificationsProps> = ({ friendships }) => {
  const t = useTranslations('NotificationsPage');
  const messages = useMessages();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <IconBell color='var(--text-color)' />
        <Text size='lg'>{t('title')}</Text>
      </div>
      <NextIntlClientProvider messages={pick(messages, 'NotificationsPage.item')}>
        <NotificationsList notifications={friendships} />
      </NextIntlClientProvider>
    </div>
  );
};
