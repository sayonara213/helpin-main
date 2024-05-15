import React from 'react';

import { useRouter } from 'next/navigation';

import styles from '../toolbar.module.scss';

import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { ConfirmModal } from '@/components/ui/confirm-modal/confirm-modal';
import { Database } from '@/lib/schema';
import { notify } from '@/utils/toast';

import { useDisclosure } from '@mantine/hooks';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const ToolbarDelete = () => {
  const { wishlist } = useWishlist();
  const t = useTranslations('WishlistPage.toolbar');
  const commonT = useTranslations('Common');

  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleDeleteWishlist = async () => {
    const { error } = await supabase.from('wishlists').delete().eq('id', wishlist.id);
    if (error) {
      notify('error', commonT('errors.default'));
      return;
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <ConfirmModal
        opened={opened}
        onConfirm={handleDeleteWishlist}
        onCancel={close}
        title={t('delete.title')}
        description={t('delete.body')}
      />
      <ActionIcon onClick={open} variant='gradient' gradient={{ from: '#c92c2c', to: '#cc1987' }}>
        <IconTrash size={20} />
      </ActionIcon>
    </>
  );
};
