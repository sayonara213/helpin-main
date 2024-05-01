import React from 'react';

import { NavbarItem } from '../navbar-item/navbar-item';

import { Database } from '@/lib/schema';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IconLogout } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface INavbarSignOutProps {
  isExpanded: boolean;
}

export const NavbarSignOut: React.FC<INavbarSignOutProps> = ({ isExpanded }) => {
  const supabase = createClientComponentClient<Database>();
  const t = useTranslations('Navigation');

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('ERROR:', error);
    }
  }
  return (
    <NavbarItem
      name={t('signOut')}
      icon={<IconLogout color='white' />}
      onClick={handleSignOut}
      isExpanded={isExpanded}
    />
  );
};
