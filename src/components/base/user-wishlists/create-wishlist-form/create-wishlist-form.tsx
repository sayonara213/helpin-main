import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './create-wishlist-form.module.scss';

import { useAuth } from '../../provider/auth-provider';

import { Avatar } from '@/components/ui/avatar/avatar';
import { wishlistSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';
import { IWishlistForm } from '@/types/form.types';
import { notify } from '@/utils/toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Switch, Text, TextInput, Textarea } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { getValidationLocalization } from '@/utils/form';

export const CreateWishlistForm = () => {
  const supabase = createClientComponentClient<Database>();
  const [isShared, setIsShared] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const user = useAuth();

  const t = useTranslations('HomePage.create.form');
  const commonT = useTranslations('Common');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IWishlistForm>({
    resolver: yupResolver<IWishlistForm>(wishlistSchema),
    mode: 'onBlur',
  });

  const translatedErrors = getValidationLocalization<IWishlistForm>(commonT, errors);

  const onSubmit = async (data: IWishlistForm) => {
    setIsLoading(true);
    if (isShared) {
    } else {
      const { data: wishlist, error } = await supabase
        .from('wishlists')
        .insert({
          title: data.title,
          description: data.description,
          monobank_url: data.monobankUrl,
          owner_id: user.id,
          location: data.location,
        })
        .select()
        .single();
      error ? notify('error', commonT('errors.default')) : push(`/wishlist/${wishlist.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextInput
        {...register('title')}
        placeholder={t('title.label')}
        label={t('title.label')}
        description={t('title.description')}
        error={translatedErrors['title']}
      />
      <Textarea
        {...register('description')}
        placeholder={t('description.label')}
        label={t('description.label')}
        description={t('description.description')}
        error={translatedErrors['description']}
      ></Textarea>
      <TextInput
        {...register('monobankUrl')}
        placeholder={'https://api.monobank.ua/'}
        label={t('mono.label')}
        description={t('mono.description')}
        error={translatedErrors['monobankUrl']}
      />
      <TextInput
        {...register('location')}
        placeholder={'м. Львів'}
        label={t('location.label')}
        description={t('location.description')}
        error={translatedErrors['monobankUrl']}
      />
      <Button type='submit' fullWidth loading={isLoading} disabled={isLoading}>
        {t('submit.label')}
      </Button>
    </form>
  );
};
