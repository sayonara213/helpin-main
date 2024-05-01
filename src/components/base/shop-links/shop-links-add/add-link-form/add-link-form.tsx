import React, { useState } from 'react';

import styles from './add-link-form.module.scss';

import { useAuth } from '@/components/base/provider/auth-provider';
import { addLinkSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { TShop } from '@/types/database.types';
import { IAddLinkForm } from '@/types/form.types';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface IAddLinkFormProps {
  addLink: (link: TShop) => void;
  closePopover: () => void;
}

export const AddLinkForm: React.FC<IAddLinkFormProps> = ({ addLink, closePopover }) => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('HomePage.shops.modal');

  const supabase = createClientComponentClient<Database>();

  const user = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddLinkForm>({
    mode: 'onBlur',
    resolver: yupResolver(addLinkSchema),
  });

  const onSubmit = async (data: IAddLinkForm) => {
    const { linkName, linkUrl } = data;
    try {
      setIsLoading(true);
      await supabase
        .from('shops')
        .insert([{ user_id: user?.id, link_name: linkName, link_url: linkUrl }]);

      addLink({
        id: Date.now(),
        link_name: linkName,
        link_url: linkUrl,
        user_id: user?.id,
      });
      setIsLoading(false);
      closePopover();
    } catch {}
  };

  return (
    <div className={styles.wrapper}>
      <Text size='sm'>{t('title')}</Text>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          size='sm'
          placeholder='Rozetka'
          {...(register && register('linkName', { required: true }))}
          error={errors['linkName']?.message}
        />
        <Input
          size='sm'
          placeholder='https://rozetka.com.ua/'
          {...(register && register('linkUrl', { required: true }))}
          error={errors['linkUrl']?.message}
        />
        <Button size='sm' fullWidth type='submit' loading={isLoading}>
          {t('submit')}
        </Button>
      </form>
    </div>
  );
};
