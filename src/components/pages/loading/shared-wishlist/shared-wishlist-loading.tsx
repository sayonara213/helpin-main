import styles from '@/styles/app/app.module.scss';
import { Skeleton } from '@mantine/core';

export const SharedWishlistLoading = () => {
  return (
    <div className={styles.container} style={{ flexDirection: 'column' }}>
      <Skeleton width={'40%'} height={43} radius={8} style={{ marginBottom: 12 }} />
      <div className={styles.sharedWishlistWrapper}>
        <section className={styles.wishlistWrapper}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Skeleton width={'30%'} height={43} radius={8} style={{ marginBottom: 12 }} />
            <Skeleton width={'100%'} radius={8} style={{ flex: 1 }} />
          </div>
        </section>
        <section className={styles.wishlistWrapper}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Skeleton width={'30%'} height={43} radius={8} style={{ marginBottom: 12 }} />
            <Skeleton width={'100%'} radius={8} style={{ flex: 1 }} />
          </div>
        </section>
      </div>
    </div>
  );
};
