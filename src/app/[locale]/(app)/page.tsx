import React from 'react';

import { cookies } from 'next/headers';

import { Database } from '@/lib/schema';
import styles from '@/styles/app/app.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { RecomendedDonations } from '@/components/base/recomended-donations/recomended-donations';
import { DonationSettings } from '@/components/base/recomended-donations/donation-settings/donation-settings';

interface IAppProps {
  params?: {
    num?: string;
  };
  searchParams?: {
    page?: string;
    search?: string;
    sort?: string;
    order?: string;
    verified?: string;
    personal?: string;
  };
}

const App = async ({ searchParams }: IAppProps) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;
  const search = searchParams?.search || '';

  const searchSort = searchParams?.sort === 'title' ? 'title' : 'updated_at';

  let query = supabase
    .from('wishlists')
    .select(
      `
      *,
      profiles (*)
    `,
      { count: 'exact' },
    )
    .order(searchSort, {
      ascending: searchParams?.order === 'asc' || !searchParams?.order,
    })
    .or(`title.ilike.%${search}%, description.ilike.%${search}%, location.ilike.%${search}%`)
    .range((currentPage - 1) * 6, currentPage * 6 - 1);

  if (searchParams?.verified === 'true') {
    query = query.filter('profiles.is_verified', 'eq', true);
  }

  if (searchParams?.personal === 'true') {
    query = query.filter('owner_id', 'eq', user.id);
  }

  const { data: donations, count, error } = await query;

  const pages = Math.ceil(count! / 6);

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <DonationSettings />
        <RecomendedDonations donations={donations} totalPages={pages} />
      </section>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default App;
