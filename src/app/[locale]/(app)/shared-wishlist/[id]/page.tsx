import React, { Suspense } from 'react';

import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { SharedWishlist } from '@/components/base/shared-wishlist/shared-wishlist';
import { Database } from '@/lib/schema';
import container from '@/styles/app/app.module.scss';
import { TSharedWishlist, TWishlist } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Suggestions } from '@/components/base/suggestions/suggestions';
import { SuggestionsLoading } from '@/components/pages/loading/wishlist/suggestions/suggestions-loading';

interface ISharedWishlistJoin extends TSharedWishlist {
  wishlist_one: TWishlist;
  wishlist_two: TWishlist;
}

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

  const { data: wishlistsJoin, error } = (await supabase
    .from('shared_wishlists')
    .select(
      `
        *,
        wishlist_one: wishlists!wishlist_id_one (*), 
        wishlist_two: wishlists!wishlist_id_two (*)
      `,
    )
    .eq('id', params.id)
    .single()) as never as { data: ISharedWishlistJoin; error: Error };

  if (wishlistsJoin === null || !user) {
    notFound();
  }

  const { wishlist_one, wishlist_two, ...sharedWishlist } = wishlistsJoin;

  return (
    <div className={container.sharedWishlistContainer}>
      <SharedWishlist
        sharedWishlist={sharedWishlist}
        wishlistOne={wishlist_one}
        wishlistTwo={wishlist_two}
        userId={user?.id}
      >
        <section className={container.sharedWishlistWrapper}>
          <Wishlist
            wishlist={wishlist_one.owner_id === user.id ? wishlist_one : wishlist_two}
            searchParams={searchParams}
            isOwnWishlist={true}
          />
          <Wishlist
            wishlist={wishlist_two.owner_id === user.id ? wishlist_one : wishlist_two}
            searchParams={searchParams}
            isOwnWishlist={false}
          />
        </section>
        <Suspense fallback={<SuggestionsLoading />}>
          <Suggestions
            wishlistId={wishlist_two.owner_id === user.id ? wishlist_one.id : wishlist_two.id}
            userId={user.id}
          />
        </Suspense>
      </SharedWishlist>
    </div>
  );
};

export default WishlistPage;
