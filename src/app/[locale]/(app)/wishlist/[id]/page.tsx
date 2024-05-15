import React, { Suspense } from 'react';

import { cookies } from 'next/headers';

import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Database } from '@/lib/schema';
import styles from '@/styles/app/app.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound } from 'next/navigation';
import { Suggestions } from '@/components/base/suggestions/suggestions';
import { SuggestionsLoading } from '@/components/pages/loading/wishlist/suggestions/suggestions-loading';

const WishlistPage = async ({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string | undefined };
}) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: wishlist, error } = await supabase
    .from('wishlists')
    .select()
    .eq('id', params.id)
    .single();

  if (wishlist === null || error) {
    notFound();
  }

  const isOwn = user?.id === wishlist.owner_id;

  return (
    <div className={styles.wishlistWrapper}>
      <Wishlist wishlist={wishlist} isOwnWishlist={isOwn} searchParams={searchParams} />
      <Suspense fallback={<SuggestionsLoading />}>
        <Suggestions wishlistId={wishlist.id} userId={user?.id!} />
      </Suspense>
    </div>
  );
};

export default WishlistPage;
