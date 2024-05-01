import { notifications } from '@mantine/notifications';

type TNotificationType = 'success' | 'error' | 'info' | 'warning';

export const notify = (type: TNotificationType = 'success', message: string) => {
  const notificationOptions = {
    success: {
      color: 'green',
    },
    error: {
      color: 'red',
    },
    info: {
      color: 'purple',
    },
    warning: {
      color: 'orange',
    },
  };

  notifications.show({
    message,
    color: notificationOptions[type].color,
  });
};
