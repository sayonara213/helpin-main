'use client';

import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import styles from '../user-wishlists.module.scss';
import { CreateWishlistForm } from '../create-wishlist-form/create-wishlist-form';

interface ICreateWishlistButtonProps {
  modalTitle: string;
}

export const CreateWishlistButton: React.FC<ICreateWishlistButtonProps> = ({ modalTitle }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon
        variant='gradient'
        gradient={{ from: '#7745e9', to: '#9a45e9', deg: 45 }}
        size='md'
        onClick={open}
      >
        <IconPlus />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        title={modalTitle}
        className={styles.modal}
      >
        <CreateWishlistForm />
      </Modal>
    </>
  );
};
