import React from 'react';
import pick from 'lodash/pick';

import styles from './additional.module.scss';

import container from '@/styles/container.module.scss';
import { classes } from '@/utils/styles';
import { Text } from '@mantine/core';

import { AuthAdditionalForm } from './additional-form/additional-form';
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';

export const AuthAdditional = () => {
  const t = useTranslations('AuthPage.AuthAdditional');
  const messages = useMessages();

  return (
    <div className={classes(container.container, styles.wrapper)}>
      <Text size='xl'>{t('title')}</Text>
      <Text size='md'>{t('sub')}</Text>
      <NextIntlClientProvider messages={pick(messages, 'AuthPage.AuthAdditional.fields', 'Common')}>
        <AuthAdditionalForm />
      </NextIntlClientProvider>
    </div>
  );
};
