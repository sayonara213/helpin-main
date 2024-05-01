'use client';

import React, { useState } from 'react';

import styles from './confirm-modal.module.scss';

import { Button, Modal, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

interface IConfirmModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  opened: boolean;
}

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  opened,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const commonT = useTranslations('Common');

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onCancel();
  };

  return (
    <Modal opened={opened} onClose={onCancel} title={title} centered>
      <Text>{description}</Text>
      <div className={styles.wrapper}>
        <Button onClick={handleConfirm} loading={isLoading}>
          {commonT('buttons.confirm')}
        </Button>
        <Button onClick={onCancel} variant='outline' color='red'>
          {commonT('buttons.cancel')}
        </Button>
      </div>
    </Modal>
  );
};
