import React from 'react';
import pick from 'lodash/pick';

import styles from './auth.module.scss';
import { AuthForm } from './auth-form/auth-form';

import { Logo } from '@/components/ui/icon/logo';

import { Text } from '@mantine/core';
import { AuthProviders } from './auth-providers/auth-providers';

import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import Link from 'next/link';

interface IAuthProps {
  isSignIn: boolean;
}

const Auth: React.FC<IAuthProps> = ({ isSignIn }) => {
  const t = useTranslations('AuthPage');
  const messages = useMessages();

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
        <Text size='50px' fw='bold'>
          Helpin
        </Text>
      </div>
      <div className={styles.container}>
        <Text size='lg'>{t(`${isSignIn ? 'signIn' : 'signUp'}.title`)}</Text>
        <NextIntlClientProvider messages={pick(messages, 'AuthPage', 'Common')}>
          <AuthForm isSignIn={isSignIn} />
          <AuthProviders />
        </NextIntlClientProvider>
        <Text
          component={Link}
          href={isSignIn ? '/auth/sign-up' : '/auth/sign-in'}
          size='sm'
          c={'dimmed'}
          ta={'right'}
          td={'underline'}
          style={{ cursor: 'pointer' }}
        >
          {t(`${isSignIn ? 'signIn' : 'signUp'}.option`)}
        </Text>
      </div>
    </div>
  );
};

export default Auth;
