import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Notifications } from '@/components/base/notifications/notifications';
import { Database } from '@/lib/schema';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const NotificationsPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: notifications } = await supabase
    .from('friendships')
    .select(`*,profiles!friendships_user_id_fkey(*)`)
    .eq('friend_id', user.id)
    .eq('status', 'pending');

  return <Notifications friendships={notifications} />;
};

export const dynamic = 'force-dynamic';

export default NotificationsPage;
