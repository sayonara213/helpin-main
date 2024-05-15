'use client';

import React, { useEffect, useState } from 'react';

import styles from './chat.module.scss';
import container from '@/styles/container.module.scss';
import { TProfile } from '@/types/database.types';
import { Avatar, Divider, Flex, Text } from '@mantine/core';
import { ChatControls } from './chat-controls/chat-controls';
import { ChatWindow } from './chat-window/chat-window';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../database.types';
import { AnimatePresence, motion } from 'framer-motion';
import { useWishlist } from '../provider/wishlist-provider';

interface IChatProps {
  listId: number;
  profileId: string;
}

export interface IMessage {
  id: number;
  text: string;
  senderId: string;
}

const messagesMock = [
  {
    id: 1,
    text: 'Вітаю!',
    senderId: '10304b62-8547-464e-93f6-5da3f937c32e',
  },
  {
    id: 2,
    text: 'Не будь байдужим, допоможи кому потрібно!',
    senderId: '10304b62-8547-464e-93f6-5da3f937c32e',
  },
  {
    id: 3,
    text: 'Дякую за ініціативу!',
    senderId: 'a8c41ffb-e2d8-46e7-b0e4-bcf63413d02f',
  },
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Chat: React.FC<IChatProps> = ({ listId, profileId }) => {
  const [messages, setMessages] = useState<IMessage[]>(messagesMock);
  const [profile, setProfile] = useState<TProfile | null>(null);
  const { isChat } = useWishlist();

  const supabase = createClientComponentClient<Database>();

  const fetchProfile = async () => {
    const { data } = (await supabase
      .from('profiles')
      .select()
      .eq('id', profileId)
      .single()) as never as { data: TProfile };

    setProfile(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const sendMessage = (message: IMessage) => {
    setMessages([...messages, message]);
  };

  return (
    isChat && (
      <section className={container.linksWrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Flex gap={8} align={'center'} mb={12}>
              <Avatar src={profile?.avatar_url} size={32} />

              <Text>{profile?.full_name}</Text>
            </Flex>
            <Divider />
          </div>

          <ChatWindow messages={messages} />
          <ChatControls sendMessage={sendMessage} />
        </div>
      </section>
    )
  );
};
