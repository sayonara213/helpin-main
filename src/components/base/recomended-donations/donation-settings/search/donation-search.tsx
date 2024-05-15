'use client';
import React from 'react';

import { TextInput } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const DonationSearch = () => {
  const [search, setSearch] = React.useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateSearchQuery = (updatedQuery: any) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateSearchQuery({ search });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput placeholder='Search' onChange={handleChange} value={search} />
    </form>
  );
};
