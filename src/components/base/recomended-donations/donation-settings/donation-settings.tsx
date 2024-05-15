import React from 'react';
import { DonationSearch } from './search/donation-search';
import { DonationFiltration } from './filtration/donation-filtration';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'lodash';
import { Flex } from '@mantine/core';
import { DonationVerified } from './verified/donation-verified';
import { CreateWishlistButton } from '../../user-wishlists/create-wishlist-button/create-wishlist-button';
import { FilterPersonal } from './personal/personal';

export const DonationSettings = async () => {
  const messages = await getMessages();

  return (
    <Flex direction={'column'} w={'100%'} gap={12}>
      <NextIntlClientProvider messages={pick(messages, 'WishlistPage', 'HomePage', 'Common')}>
        <DonationSearch />
        <Flex gap={12}>
          <DonationFiltration />
          <DonationVerified />
          <FilterPersonal />
          <CreateWishlistButton modalTitle={''} />
        </Flex>
      </NextIntlClientProvider>
    </Flex>
  );
};
