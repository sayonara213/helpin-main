'use client';

import { ActionIcon, Modal, Tooltip } from '@mantine/core';
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
      <Tooltip label='Створити збір'>
        <ActionIcon
          variant='gradient'
          gradient={{ from: '#32a060', to: '#349e7d', deg: 45 }}
          size='md'
          onClick={open}
        >
          <IconPlus />
        </ActionIcon>
      </Tooltip>
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
