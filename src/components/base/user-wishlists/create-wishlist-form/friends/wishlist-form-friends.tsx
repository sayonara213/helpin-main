import React, { useState } from 'react';

import { FriendsItem } from './friends-item/friends-item';
import styles from './wishlist-form-friends.module.scss';

import { NavbarFriendsSearch } from '@/components/base/navbar/navbar-users/navbar-users-search/friends-search/friends-search';
import { TProfile } from '@/types/database.types';

import { Loader, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

interface IWishlistFormFriendsProps {
  onSelect: (friend: TProfile) => void;
}

export const WishlistFormFriends: React.FC<IWishlistFormFriendsProps> = ({ onSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations('HomePage.create.form');

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <TextInput
        value={query}
        onChange={handleSetQuery}
        placeholder={t('shared.placeholder')}
        rightSection={isLoading && <Loader size={16} />}
      />
      <NavbarFriendsSearch
        query={query}
        setIsLoading={setIsLoading}
        CustomElement={FriendsItem}
        extraProps={onSelect}
      />
    </div>
  );
};
