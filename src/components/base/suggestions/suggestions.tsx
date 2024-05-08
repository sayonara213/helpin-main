'use server';

import React from 'react';

import { Text } from '@mantine/core';

import styles from './suggestions.module.scss';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/schema';
import { SuggestionsList } from './list/suggestions-list';
import { cookies } from 'next/headers';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { pick } from 'lodash';

interface ISuggestionsProps {
  wishlistId: number;
  userId: string;
}

export const Suggestions: React.FC<ISuggestionsProps> = async ({ wishlistId, userId }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const t = await getTranslations('WishlistPage.suggestions');
  const messages = await getMessages();

  const { data: suggestions, error } = await supabase
    .from('suggestions')
    .select('*')
    .eq('wishlist_id', wishlistId)
    .eq('created_by', userId);

  const { data: wishlist, error: wishlistError } = await supabase
    .from('wishlists')
    .select()
    .eq('id', wishlistId)
    .single();

  if (!wishlist) return;

  return (
    <div className={styles.wrapper}>
      <Text lh={'xs'}>{t('title')}</Text>
      <NextIntlClientProvider messages={pick(messages, 'WishlistPage.suggestions', 'Common')}>
        <SuggestionsList
          wishlistId={wishlistId}
          userId={userId}
          suggestions={suggestions}
          title={wishlist?.title}
          description={wishlist?.description}
        />
      </NextIntlClientProvider>
    </div>
  );
};
