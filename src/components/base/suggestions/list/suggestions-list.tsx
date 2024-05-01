'use client';

import React, { useState } from 'react';

import { Database } from '@/lib/schema';
import { TSuggestion } from '@/types/database.types';
import { notify } from '@/utils/toast';

import styles from '../suggestions.module.scss';
import { AddSuggestion } from '../add-suggestion/add-suggestion';
import { SuggestionsItem } from '../item/suggestions-item';
import { useLocale, useTranslations } from 'next-intl';

interface ISuggestionsListProps {
  suggestions: TSuggestion[] | null;
  wishlistId: number;
  userId: string;
}

export const SuggestionsList: React.FC<ISuggestionsListProps> = ({
  suggestions,
  wishlistId,
  userId,
}) => {
  const [suggestionsState, setSuggestionsState] = useState<TSuggestion[]>(suggestions || []);

  const locale = useLocale();
  const t = useTranslations('Common.errors');

  const addSuggestion = async () => {
    try {
      const data = await fetch('/api/open-ai-suggestion', {
        method: 'POST',
        body: JSON.stringify({ wishlistId, userId, suggestions: suggestionsState, locale }),
      });

      const { suggestion } = await data.json();

      setSuggestionsState([...suggestionsState, suggestion]);
    } catch {
      notify('error', t('default'));
    }
  };

  const regenerateSuggestion = async (suggestion: TSuggestion) => {
    try {
      const data = await fetch('/api/open-ai-suggestion', {
        method: 'POST',
        body: JSON.stringify({
          wishlistId,
          userId,
          suggestion,
          uggestions: suggestionsState,
          locale,
        }),
      });

      const { suggestion: newSuggestion } = await data.json();

      setSuggestionsState(
        suggestionsState.map((s) => (s.id === suggestion.id ? newSuggestion : s)),
      );
    } catch {
      notify('error', t('default'));
    }
  };

  const removeSuggestion = (suggestion: TSuggestion) => {
    setSuggestionsState(suggestionsState.filter((s) => s.id !== suggestion.id));
  };

  return (
    <div className={styles.list}>
      {suggestionsState?.map((suggestion) => (
        <SuggestionsItem
          key={suggestion.id}
          suggestion={suggestion}
          deleteSuggestion={removeSuggestion}
          regenerateSuggestion={regenerateSuggestion}
        />
      ))}
      {suggestionsState.length < 3 && <AddSuggestion addSuggestion={addSuggestion} />}
    </div>
  );
};
