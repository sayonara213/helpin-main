import React, { useState } from 'react';

import { TSuggestion } from '@/types/database.types';
import { ActionIcon, Card, Group, LoadingOverlay, Text } from '@mantine/core';
import { AccuracyBadge } from './accuracy-badge/accuracy-badge';
import { Database } from '@/lib/schema';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './suggestions-item.module.scss';
import { IconRefresh, IconTrash } from '@tabler/icons-react';

interface ISuggestionsItemProps {
  suggestion: TSuggestion;
  regenerateSuggestion: (suggestion: TSuggestion) => void;
  deleteSuggestion: (suggestion: TSuggestion) => void;
}

export const SuggestionsItem: React.FC<ISuggestionsItemProps> = ({
  suggestion,
  regenerateSuggestion,
  deleteSuggestion,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClientComponentClient<Database>();

  const handleDeleteSuggestion = async () => {
    deleteSuggestion(suggestion);
    await supabase.from('suggestions').delete().eq('id', suggestion.id);
  };

  const handleRegenerateSuggestion = async () => {
    setIsLoading(true);
    await regenerateSuggestion(suggestion);
    setIsLoading(false);
  };

  return (
    <Card padding='lg' radius='md' withBorder flex={1} className={styles.wrapper}>
      <Card.Section inheritPadding>
        <Group justify='space-between' mt='md' mb='xs'>
          <Text fw={500}>{suggestion.name}</Text>
          <AccuracyBadge accuracy={suggestion.confidence_score} />
        </Group>
      </Card.Section>

      <Text size='sm' c='dimmed'>
        {suggestion.description}
      </Text>
      <div className={styles.buttons}>
        <ActionIcon
          onClick={handleRegenerateSuggestion}
          variant='gradient'
          gradient={{ from: '#e79c33', to: '#e28418' }}
        >
          <IconRefresh size={20} />
        </ActionIcon>
        <ActionIcon
          onClick={handleDeleteSuggestion}
          variant='gradient'
          gradient={{ from: '#c92c2c', to: '#cc1987' }}
        >
          <IconTrash size={20} />
        </ActionIcon>
      </div>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 1 }} />
    </Card>
  );
};
