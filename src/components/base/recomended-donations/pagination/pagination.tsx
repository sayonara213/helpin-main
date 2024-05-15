'use client';

import React, { useEffect, useState } from 'react';

import { Pagination } from '@mantine/core';

import styles from './pagination.module.scss';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface IPaginationProps {
  totalPages: number;
}

export const DonationsPagination: React.FC<IPaginationProps> = ({ totalPages }) => {
  const [activePage, setPage] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(activePage));
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  }, [activePage]);

  return (
    <div className={styles.wrapper}>
      <Pagination total={totalPages} value={activePage} onChange={setPage} />
    </div>
  );
};
