'use client';

import React, { useState } from 'react';

import styles from '../notifications.module.scss';
import { IFiriendshipProfile } from '@/types/database.types';
import { NotificationsItem } from '../notifications-item/notifications-item';

import { Text } from '@mantine/core';

interface INotificationsListProps {
  notifications: IFiriendshipProfile[] | null;
}

export const NotificationsList: React.FC<INotificationsListProps> = ({ notifications }) => {
  const [notificationsList, setNotificationsList] = useState<IFiriendshipProfile[] | null>(
    notifications,
  );

  const hideNotification = (id: number) => {
    const updatedNotifications = notifications?.filter((notification) => notification.id !== id);
    setNotificationsList(updatedNotifications || null);
  };

  const available = notificationsList && notificationsList.length > 0;

  return (
    <div className={styles.list}>
      {available ? (
        notificationsList.map((notification) => (
          <NotificationsItem
            notification={notification}
            key={notification.id}
            hideNotification={hideNotification}
          />
        ))
      ) : (
        <div className={styles.empty}>
          <Text size='md'>No notifications</Text>
        </div>
      )}
    </div>
  );
};
