import React from 'react';

import { cookies } from 'next/headers';

import { UserWishlists } from '@/components/base/user-wishlists/user-wishlists';
import { Database } from '@/lib/schema';
import styles from '@/styles/app/app.module.scss';
import { ISharedWishlistJoinProfile, TWishlist } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { RecomendedDonations } from '@/components/base/recomended-donations/recomended-donations';

type TWishlistsList = (TWishlist | ISharedWishlistJoinProfile)[];

const App = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = (await supabase
    .from('wishlists')
    .select()
    .eq('owner_id', user?.id!)
    .eq('is_shared', false)
    .order('updated_at', { ascending: false })) as never as { data: TWishlist[]; error: Error };

  const { data: donations } = await supabase
    .from('wishlists')
    .select()
    .order('updated_at', { ascending: false });

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <RecomendedDonations donations={donations} />
        <UserWishlists wishlists={data} />
      </section>
    </div>
  );
};

export default App;
