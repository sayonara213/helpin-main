import React from 'react';

import { useWishlist } from '@/components/base/provider/wishlist-provider';

import { ActionIcon } from '@mantine/core';
import { IconMessage } from '@tabler/icons-react';

export const ToolbarChat = () => {
  const { setIsChat, isChat } = useWishlist();

  const handleOpenChat = () => {
    setIsChat(!isChat);
    console.log(isChat);
  };

  return (
    <ActionIcon
      onClick={handleOpenChat}
      variant='gradient'
      gradient={{ from: '#2c7dc9', to: '#19b4cc' }}
    >
      <IconMessage size={20} />
    </ActionIcon>
  );
};
