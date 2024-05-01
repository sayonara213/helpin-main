import React from 'react';

import { WishlistItemForm } from './item-form/item-form';

import { useWishlist } from '@/components/base/provider/wishlist-provider';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

interface IWishlistAddItemProps {
  wishlistId: number;
}

export const WishlistAddItem: React.FC<IWishlistAddItemProps> = ({ wishlistId }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { addItem } = useWishlist();

  const t = useTranslations('WishlistPage.add');

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('form.title')} centered>
        <WishlistItemForm wishlistId={wishlistId} closeModal={close} optimisticAction={addItem} />
      </Modal>
      <Button
        variant='gradient'
        gradient={{ from: '#418a80', to: '#10b163' }}
        onClick={open}
        fullWidth
      >
        {t('title')}
      </Button>
    </>
  );
};
