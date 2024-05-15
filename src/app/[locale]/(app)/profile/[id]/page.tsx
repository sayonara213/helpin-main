import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import ProfileInfo from '@/components/base/user-profile/profile-info/profile-info';
import ProfileWishlists from '@/components/base/user-profile/profile-wishlists/profile-wishlists';
import { Database } from '@/lib/schema';
import styles from '@/styles/pages/pages.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const ProfileByIdPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase.from('profiles').select().eq('id', params.id).single();

  if (user?.id === profile?.id) {
    redirect('/profile');
  }

  if (!profile) {
    redirect('/profile');
  }

  return (
    <div className={styles.grid}>
      <ProfileInfo profile={profile} />
      <ProfileWishlists profile={profile} />
    </div>
  );
};

export default ProfileByIdPage;
