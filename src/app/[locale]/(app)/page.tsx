import React from 'react';

import { cookies } from 'next/headers';

import { Birthdays } from '@/components/base/birthdays/birthdays';
import { ShopLinks } from '@/components/base/shop-links/shop-links';
import { UserWishlists } from '@/components/base/user-wishlists/user-wishlists';
import { Database } from '@/lib/schema';
import styles from '@/styles/app/app.module.scss';
import { ISharedWishlistJoinProfile, TWishlist } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

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

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <UserWishlists wishlists={data} />
      </section>
    </div>
  );
};

export default App;
