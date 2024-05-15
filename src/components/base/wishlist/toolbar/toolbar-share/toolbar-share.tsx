'use client';

import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconShare } from '@tabler/icons-react';
import React from 'react';
import { ShareModal } from './share-logic/modal';

export const ToolbarShare = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon onClick={open} variant='gradient' gradient={{ from: '#25a15b', to: '#11af92' }}>
        <IconShare size={20} />
      </ActionIcon>
      <Modal opened={opened} onClose={close}>
        <ShareModal />
      </Modal>
    </>
  );
};
