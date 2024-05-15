import React from 'react';

import styles from './chat-window.module.scss';
import { IMessage } from '../chat';
import { Message } from './message/message';

interface IChatWindowProps {
  messages: IMessage[];
}

export const ChatWindow: React.FC<IChatWindowProps> = ({ messages }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.window}>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>
    </div>
  );
};
