import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './create-wishlist-form.module.scss';
import { WishlistFormFriends } from './friends/wishlist-form-friends';

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

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

export const CreateWishlistForm = () => {
  const supabase = createClientComponentClient<Database>();
  const [isShared, setIsShared] = useState<boolean>(false);
  const [profile, setProfile] = useState<TProfile | undefined>(undefined);
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
        })
        .select()
        .single();
      error ? notify('error', commonT('errors.default')) : push(`/wishlist/${wishlist.id}`);
    }
  };

  const handleIsSharedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShared(e.target.checked);
  };

  const handleSetFriend = (friend: TProfile) => {
    setValue('sharedWith', friend.id);
    setProfile(friend);
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
        label={'Моно банка'}
        description={t('title.description')}
        error={translatedErrors['monobankUrl']}
      />
      <Switch label={t('shared.label')} onChange={handleIsSharedChange} checked={isShared} />
      <div>
        <AnimatePresence>
          {isShared ? (
            profile ? (
              <motion.div
                animate={'open'}
                exit={'closed'}
                initial={'closed'}
                variants={variants}
                key='friend-profile'
              >
                <Input.Wrapper label={t('shared.selected')}>
                  <div className={styles.friend}>
                    <div className={styles.section}>
                      <Avatar src={profile.avatar_url} size={32} />
                      <Text>{profile.full_name}</Text>
                    </div>

                    <Button onClick={() => setProfile(undefined)}>Remove</Button>
                  </div>
                </Input.Wrapper>
              </motion.div>
            ) : (
              <motion.div
                animate={'open'}
                exit={'closed'}
                initial={'closed'}
                variants={variants}
                key='wishlist-form'
              >
                <Input.Wrapper label={t('shared.action')} description={t('shared.description')}>
                  <WishlistFormFriends onSelect={handleSetFriend} />
                </Input.Wrapper>
              </motion.div>
            )
          ) : (
            <motion.div
              animate={'open'}
              exit={'closed'}
              initial={'closed'}
              variants={variants}
              key='is-private'
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
      <Button type='submit' fullWidth loading={isLoading} disabled={isLoading}>
        {t('submit.label')}
      </Button>
    </form>
  );
};
