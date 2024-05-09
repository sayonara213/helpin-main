import React, { useEffect, useState } from 'react';

import { IMessage } from '../../chat';
import { TProfile } from '@/types/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../database.types';
import { Avatar, Text } from '@mantine/core';

import styles from './message.module.scss';
import { useAuth } from '@/components/base/provider/auth-provider';

interface IMessageProps {
  message: IMessage;
}

export const Message: React.FC<IMessageProps> = ({ message }) => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const user = useAuth();

  const supabase = createClientComponentClient<Database>();

  const fetchProfile = async () => {
    const { data } = (await supabase
      .from('profiles')
      .select()
      .eq('id', message.senderId)
      .single()) as never as { data: TProfile };

    setProfile(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const isOwn = user.id === message.senderId;

  return (
    <div className={`${styles.wrapper} ${isOwn && styles.own}`}>
      <Avatar src={profile?.avatar_url} size={32} />
      <div className={`${styles.messageBody} `}>
        <Text size='sm' c={'dimmed'}>
          {profile?.full_name}
        </Text>
        <Text>{message.text}</Text>
      </div>
    </div>
  );
};
