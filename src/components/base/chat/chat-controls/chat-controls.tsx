import React, { useState } from 'react';

import styles from './chat-controls.module.scss';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { IMessage } from '../chat';
import { useAuth } from '../../provider/auth-provider';

interface IChatControlsProps {
  sendMessage: (message: IMessage) => void;
}

export const ChatControls: React.FC<IChatControlsProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  const user = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message) {
      sendMessage({
        id: Math.random(),
        text: message,
        senderId: user.id,
      });
      setMessage('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <TextInput
        placeholder='Введіть повідомлення'
        w={'100%'}
        value={message}
        onChange={handleChange}
      />
      <ActionIcon variant='default' size={36} onClick={handleSendMessage}>
        <IconSend color='white' size={20} />
      </ActionIcon>
    </div>
  );
};
