import React from 'react';
import container from '@/styles/container.module.scss';
import Link from 'next/link';
import { Button, Text } from '@mantine/core';
import styles from './wishlist-not-found.module.scss';

export const WishlistNotFound = () => {
  return (
    <div className={container.centerContainer} style={{ gap: '8px' }}>
      <Text
        gradient={{ from: '#6932eb', to: '#cda3dd' }}
        variant='gradient'
        size='120px'
        fw={900}
        className={styles.title}
      >
        OOPS!
      </Text>
      <Text size='lg' ta={'center'} style={{ marginBottom: '24px' }}>
        Wishlist can&apos;t be found, or you don&apos;t have access to it.
      </Text>
      <Button component={Link} href={'/'}>
        Return to Home
      </Button>
    </div>
  );
};
