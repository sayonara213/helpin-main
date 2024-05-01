import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './user-search.module.scss';
import { NavbarUserSearchItem } from './users-search-item/user-search-item';

import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { useDebouncedValue } from '@mantine/hooks';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTranslations } from 'next-intl';

interface INavbarUserSearchProps {
  query: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  closeNav?: () => void;
}

const paginationStep = 4;

export const NavbarUserSearch: React.FC<INavbarUserSearchProps> = ({
  query,
  setIsLoading,
  isLoading,
  closeNav,
}) => {
  const [users, setUsers] = useState<TProfile[]>([]);

  const [debounced] = useDebouncedValue(query, 200);
  const [pagination, setPagination] = useState({ from: 0, to: paginationStep });
  const [isEnd, setIsEnd] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const supabase = createClientComponentClient<Database>();

  const fetchUsers = useCallback(
    async (query: string, from: number, to: number) => {
      if (query.length < 1 || isLoading) return;

      setIsLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`user_name.ilike.%${query}%,full_name.ilike.%${query}%`)
        .range(from, to);

      setIsLoading(false);

      if (!data || error || data.length < 1) setIsEnd(true);

      return data;
    },
    [query, pagination],
  );

  const handleFetchMore = async (query: string) => {
    const newUsers = await fetchUsers(query, pagination.from, pagination.to);
    if (newUsers && newUsers.length > 0) {
      setIsEnd(false);
      setUsers((prev) => [...prev, ...newUsers]);
    }
  };

  const handleFetchInitial = async () => {
    const users = await fetchUsers(debounced, 0, paginationStep);
    if (users) setUsers(users);
  };

  useEffect(() => {
    setPagination({ from: 0, to: paginationStep });
    setIsEnd(false);

    handleFetchInitial();
  }, [debounced]);

  useEffect(() => {
    if (pagination.from === 0 || isEnd) return;

    handleFetchMore(debounced);
  }, [pagination]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
        setPagination((prev) => ({
          from: prev.to + 1,
          to: prev.to + paginationStep,
        }));
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  return (
    <div className={styles.wrapper} ref={scrollRef}>
      {users.map((user) => (
        <NavbarUserSearchItem profile={user} key={user.id} closeNav={closeNav} />
      ))}
    </div>
  );
};
