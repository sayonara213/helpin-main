import React from 'react';

import { useWishlist } from '@/components/base/provider/wishlist-provider';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ActionIcon } from '@mantine/core';
import { IconCheck, IconEdit } from '@tabler/icons-react';

interface IToolbarEditProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const ToolbarEdit: React.FC<IToolbarEditProps> = ({ isEditing, setIsEditing }) => {
  const supabase = createClientComponentClient();
  const { items, orderChanged, setOrderChanged } = useWishlist();

  const handleReorder = async () => {
    try {
      if (orderChanged) {
        setOrderChanged(false);
        const { data, error } = await supabase.from('items').upsert(items);
      }
    } catch (error) {}
  };

  const handleClick = async () => {
    if (isEditing) {
      await handleReorder();
    }

    setIsEditing(!isEditing);
  };

  return (
    <ActionIcon
      onClick={handleClick}
      variant='gradient'
      gradient={{ from: '#e79c33', to: '#e28418' }}
    >
      {isEditing ? <IconCheck size={20} /> : <IconEdit size={20} />}
    </ActionIcon>
  );
};
