'use client';

import React from 'react';
import styles from './auth-providers.module.scss';
import { Provider } from '@supabase/supabase-js';
import { AuthProvidersItem } from './auth-providers-item/auth-providers-item';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/schema';
import { notify } from '@/utils/toast';
import { useTranslations } from 'next-intl';

const providers: Provider[] = ['discord', 'google'];

export const AuthProviders: React.FC = () => {
  const supabase = createClientComponentClient<Database>();
  const t = useTranslations('AuthPage.providers');

  const handleOAuth = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      notify('error', error.message);
      return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}>
        <span>{t('divider')}</span>
      </div>
      {providers.map((provider) => (
        <AuthProvidersItem
          key={provider}
          name={provider}
          onClick={handleOAuth}
          disabled={provider === 'google'}
        />
      ))}
    </div>
  );
};
