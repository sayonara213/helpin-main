'use server';

import React, { Suspense } from 'react';

import styles from './shop-links.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Text } from '@mantine/core';
import { ShopLinksList } from './shop-links-list/shop-links-list';
import { Database } from '@/lib/schema';
import { cookies } from 'next/headers';
import { ShopLinksLoader } from './shop-links-loader/shop-links-loader';
import { getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { pick } from 'lodash';

interface IShopLinksProps {
  userId: string;
}

export const ShopLinks: React.FC<IShopLinksProps> = async ({ userId }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const t = await getTranslations('HomePage.shops');
  const messages = await getMessages();

  const { data: shops, error } = await supabase.from('shops').select().eq('user_id', userId);

  if (error || !shops) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Text size='xxl' fw='bold'>
        {t('title')}
      </Text>
      <Suspense fallback={<ShopLinksLoader />}>
        <NextIntlClientProvider messages={pick(messages, 'HomePage.shops')}>
          <ShopLinksList userId={userId} initialShops={shops} />
        </NextIntlClientProvider>
      </Suspense>
    </div>
  );
};
