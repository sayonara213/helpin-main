import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../user-search.module.scss';
import { NavbarUserSearchItem } from '../users-search-item/user-search-item';

import { useAuth } from '@/components/base/provider/auth-provider';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';
import { notify } from '@/utils/toast';

import { Loader, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useTranslations } from 'next-intl';

interface ICustomElementProps {
  profile: TProfile;
  onClick?: (profile: TProfile) => void;
}

interface INavbarFriendsSearchProps {
  query: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  CustomElement?: React.ComponentType<ICustomElementProps>;
  extraProps?: (profile: TProfile) => void;
  closeNav?: () => void;
}

export const NavbarFriendsSearch: React.FC<INavbarFriendsSearchProps> = ({
  query,
  CustomElement,
  extraProps,
  closeNav,
  setIsLoading,
}) => {
  const [users, setUsers] = useState<TProfile[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<TProfile[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Navigation.users');

  const supabase = createClientComponentClient<Database>();
  const user = useAuth();

  const fetchUsers = async (query: string) => {
    if (!user.id) return;
    setIsLoading(true);

    const { data, error } = await supabase
      .rpc('get_user_friends', { current_user_id: user.id })
      .or(`user_name.ilike.%${query}%,full_name.ilike.%${query}%`);

    if (error) {
      notify('error', error.message);
    }

    if (!data) {
      setUsers([]);
      return;
    }

    setIsLoading(false);

    setUsers(data);
  };

  const filterUsers = useCallback(
    (query: string) => {
      if (!query) {
        setSearchedUsers(users);
        return;
      }

      const filteredUsers = users.filter((user) =>
        user.full_name.toLowerCase().includes(query.toLowerCase()),
      );

      setSearchedUsers(filteredUsers);
    },
    [users],
  );

  const handleRefresh = async () => {
    await fetchUsers(query);
  };

  useEffect(() => {
    fetchUsers(query);
  }, [user]);

  useEffect(() => {
    filterUsers(query);
  }, [query, users]);

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      resistance={3}
      maxPullDownDistance={60}
      pullDownThreshold={50}
      pullingContent={
        <Text size='sm' c='dimmed'>
          {t('field.pull')}
        </Text>
      }
      refreshingContent={
        <div className={styles.loader}>
          <Loader size={'sm'} className={styles.loader} />
        </div>
      }
    >
      <div className={styles.wrapper} ref={scrollRef}>
        {searchedUsers.map((user) =>
          CustomElement ? (
            <CustomElement profile={user} key={user.id} onClick={extraProps} />
          ) : (
            <NavbarUserSearchItem profile={user} key={user.id} isFriend closeNav={closeNav} />
          ),
        )}
      </div>
    </PullToRefresh>
  );
};
