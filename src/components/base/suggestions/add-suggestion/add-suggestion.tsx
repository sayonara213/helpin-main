import React, { useState } from 'react';

import styles from './add-suggestion.module.scss';
import { LoadingOverlay, Text } from '@mantine/core';
import { IconBrain } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface IAddSuggestionProps {
  addSuggestion: () => void;
}

export const AddSuggestion: React.FC<IAddSuggestionProps> = ({ addSuggestion }) => {
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations('WishlistPage.suggestions');

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    await addSuggestion();
    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <IconBrain size={20} />
      <Text>{t('add')}</Text>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 1 }} />
    </div>
  );
};
