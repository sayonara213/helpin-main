import React from 'react';

import styles from './notifications-item.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Database } from '@/lib/schema';
import { TFriendship, TProfile } from '@/types/database.types';
import { formatDateToNow } from '@/utils/date';
import { toNormalCase } from '@/utils/text';
import { notify } from '@/utils/toast';

import { Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

interface IFiriendshipProfile extends TFriendship {
  profiles: TProfile | null;
}

interface INotificationsItemProps {
  notification: IFiriendshipProfile;
  hideNotification: (id: number) => void;
}

export const NotificationsItem: React.FC<INotificationsItemProps> = ({
  notification,
  hideNotification,
}) => {
  const supabase = createClientComponentClient<Database>();
  const t = useTranslations('NotificationsPage.item');
  const locale = useLocale();

  const handleAction = async (status: TFriendship['status']) => {
    const { error } = await supabase
      .from('friendships')
      .update({ status: status })
      .eq('id', notification.id);

    if (error) {
      notify('error', 'Error accepting request');
      return;
    }

    notify('success', 'Friend request accepted');
    hideNotification(notification.id);
  };

  if (!notification.profiles) return null;

  return (
    <div className={styles.wrapper}>
      <Link href={`/profile/${notification.profiles.id}`} className={styles.left}>
        <Avatar src={notification.profiles?.avatar_url} size={40} />
        <div className={styles.col}>
          <Text size='md'>{t('friend.title')}</Text>
          <Text size='sm'>
            {t('friend.body', { name: toNormalCase(notification.profiles.full_name) })}
          </Text>
          <Text size='sm' c='dimmed'>
            {formatDateToNow(notification.created_at, locale)}
          </Text>
        </div>
      </Link>
      <div className={styles.right}>
        <IconCheck color='var(--text-color)' onClick={() => handleAction('accepted')} />
        <IconX color='var(--text-color)' onClick={() => handleAction('declined')} />
      </div>
    </div>
  );
};
