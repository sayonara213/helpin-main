'use client';

import React, { useState } from 'react';

import styles from '../auth.module.scss';

import { authSchema } from '@/constants/validation';
import { IAuthForm } from '@/types/form.types';

import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInput, Button, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { Database } from '@/lib/schema';
import { notify } from '@/utils/toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTranslations } from 'next-intl';
import { getValidationLocalization } from '@/utils/form';

interface IAuthFormProps {
  isSignIn?: boolean;
}

export const AuthForm: React.FC<IAuthFormProps> = ({ isSignIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const t = useTranslations('AuthPage');
  const errorsT = useTranslations('Common');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(authSchema),
    mode: 'onBlur',
  });

  const translatedErrors = getValidationLocalization<IAuthForm>(errorsT, errors);

  const handleAuth = async (values: IAuthForm) => {
    setIsLoading(true);
    const { error } = isSignIn
      ? await supabase.auth.signInWithPassword(values)
      : await supabase.auth.signUp(values);

    setIsLoading(false);

    if (error) {
      notify(
        'error',
        error.message === 'Invalid login credentials'
          ? errorsT('errors.auth.invalidCredentials')
          : errorsT('errors.auth.emailTaken'),
      );
    }
  };

  return (
    <form className={styles.box} onSubmit={handleSubmit(handleAuth)}>
      <TextInput
        placeholder={t('fields.email')}
        {...(register && register('email', { required: true }))}
        error={translatedErrors['email']}
      />
      <PasswordInput
        placeholder={t('fields.password')}
        {...(register && register('password', { required: true }))}
        error={translatedErrors['password']}
      />
      <Button variant='light' fullWidth type='submit' loading={isLoading} disabled={isLoading}>
        {t(`${isSignIn ? 'signIn' : 'signUp'}.title`)}
      </Button>
    </form>
  );
};
