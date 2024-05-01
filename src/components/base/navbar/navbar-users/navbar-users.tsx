import React, { useEffect, useState } from 'react';

import { NavbarFriendsSearch } from './navbar-users-search/friends-search/friends-search';
import { NavbarUserSearch } from './navbar-users-search/user-search';
import styles from './navbar-users.module.scss';

import { Loader, SegmentedControl, TextInput } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import type SwiperCore from 'swiper';

import 'swiper/css';
import { useTranslations } from 'next-intl';

interface INavbarUsersProps {
  closeNav?: () => void;
}

export const NavbarUsers: React.FC<INavbarUsersProps> = ({ closeNav }) => {
  const [selected, setSelected] = useState('friends');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [swiper, setSwiper] = useState<SwiperCore>();

  const t = useTranslations('Navigation.users');

  const options = [
    { value: 'friends', label: t('options.friends') },
    { value: 'others', label: t('options.users') },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {
    if (!swiper) return;

    swiper.slideTo(selected === 'friends' ? 0 : 1);
  }, [selected]);

  const components = [
    <NavbarFriendsSearch query={search} key={0} closeNav={closeNav} setIsLoading={setIsLoading} />,
    <NavbarUserSearch
      query={search}
      key={1}
      closeNav={closeNav}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />,
  ];

  return (
    <div className={styles.wrapper}>
      <SegmentedControl color='accent' data={options} value={selected} onChange={handleSelect} />
      <TextInput
        onChange={handleChange}
        value={search}
        placeholder={t('field.label')}
        rightSection={isLoading && <Loader size={16} />}
      />
      <div className={styles.list}>
        <Swiper onSwiper={setSwiper} slidesPerView={1}>
          {components.map((component, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              {component}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
