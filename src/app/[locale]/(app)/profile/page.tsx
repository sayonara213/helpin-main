import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Profile } from '@/components/base/profile/profile';
import styles from '@/styles/container.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/schema';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'lodash';

const ProfilePage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const messages = await getMessages();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase.from('profiles').select().eq('id', user?.id!).single();

  if (!user) {
    redirect('/auth/sign-in');
  }

  if (!profile) {
    return;
  }

  return (
    <div className={styles.centerContainer}>
      <NextIntlClientProvider messages={pick(messages, 'ProfilePage.fields', 'Common')}>
        <Profile profile={profile} />
      </NextIntlClientProvider>
    </div>
  );
};

export default ProfilePage;
