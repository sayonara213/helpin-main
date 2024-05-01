import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthAdditional } from '@/components/base/auth/additional/additional';
import { Database } from '@/lib/schema';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const AdditionalAuthPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!)
    .single();

  if (profile) {
    redirect('/');
  }

  return <AuthAdditional />;
};

export default AdditionalAuthPage;
