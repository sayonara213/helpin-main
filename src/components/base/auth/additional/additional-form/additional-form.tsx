'use client';

import React, { useState } from 'react';

import styles from '../additional.module.scss';
import { Input, TextInput, Button } from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import dayjs from 'dayjs';
import { useAuth } from '@/components/base/provider/auth-provider';
import { additionalAuthSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { IAdditionalAuthForm } from '@/types/form.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/navigation';
import { notify } from '@/utils/toast';
import { useTranslations } from 'next-intl';
import { getValidationLocalization } from '@/utils/form';

export const AuthAdditionalForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('AuthPage.AuthAdditional.fields');
  const commonT = useTranslations('Common');

  const supabase = createClientComponentClient<Database>();

  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAdditionalAuthForm>({
    resolver: yupResolver<IAdditionalAuthForm>(additionalAuthSchema),
    mode: 'onBlur',
  });

  const translatedErrors = getValidationLocalization<IAdditionalAuthForm>(commonT, errors);

  const formatDate = (date: Date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Returns a date string in 'YYYY-MM-DD' format
  };

  const onSubmit = async (data: IAdditionalAuthForm) => {
    setIsLoading(true);

    const fieldData = {
      id: auth.id,
      full_name: data.fullName as string,
      date_of_birth: formatDate(data.birthDate!),
    };

    const { error } = await supabase.from('profiles').insert(fieldData).eq('id', auth.id);

    if (error) {
      notify('error', error.message);
      setIsLoading(false);
    }

    setIsLoading(false);
    router.refresh();
  };

  const handleDateChange = (date: DateValue | null) => {
    if (date) {
      setValue('birthDate', date);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input.Wrapper id='full-name' label={t('name.label')} description={t('name.description')}>
        <TextInput
          placeholder={t('name.label')}
          {...(register && register('fullName'))}
          error={translatedErrors['fullName']}
          style={{ marginTop: 6 }}
        />
      </Input.Wrapper>
      <Input.Wrapper
        id='birth-date'
        label={t('birthday.label')}
        description={t('birthday.description')}
      >
        <DateInput
          onChange={handleDateChange}
          placeholder={t('birthday.label')}
          style={{ marginTop: 6 }}
          maxDate={dayjs().subtract(6, 'year').toDate()}
        />
      </Input.Wrapper>
      <Button loading={isLoading} type='submit'>
        {t('buttons.submit')}
      </Button>
      <Button onClick={handleLogout} variant='outline'>
        {t('buttons.back')}
      </Button>
    </form>
  );
};
