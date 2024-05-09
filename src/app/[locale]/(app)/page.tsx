import React from 'react';

import { cookies } from 'next/headers';

import { Database } from '@/lib/schema';
import styles from '@/styles/app/app.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { RecomendedDonations } from '@/components/base/recomended-donations/recomended-donations';

interface IAppProps {
  params?: {
    num?: string;
  };
  searchParams?: {
    page?: string;
  };
}

const App = async ({ searchParams }: IAppProps) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const currentPage = searchParams ? Number(searchParams.page) : 1;

  const {
    data: donations,
    count,
    error,
  } = await supabase
    .from('wishlists')
    .select(
      `
      *,
      profiles (*)
    `,
      { count: 'exact' },
    )
    .order('updated_at', { ascending: false })
    .range((currentPage - 1) * 6, currentPage * 6 - 1);

  const pages = Math.ceil(count! / 6);

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <RecomendedDonations donations={donations} totalPages={pages} />
      </section>
    </div>
  );
};

export const dynamic = 'force-dynamc';

export default App;
