import styles from '@/styles/app/app.module.scss';
import { Skeleton } from '@mantine/core';

export const WishlistLoading = () => {
  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton width={'20%'} height={43} radius={8} style={{ marginBottom: 12 }} />
            <Skeleton width={'20%'} height={43} radius={8} style={{ marginBottom: 12 }} />
          </div>
          <Skeleton width={'100%'} radius={8} style={{ flex: 1 }} />
        </div>
      </section>
      <section className={styles.linksWrapper}>
        <Skeleton width={'100%'} height={43} radius={8} style={{ marginBottom: 12 }} color='blue' />
        <Skeleton width={'120px'} height={'100%'} radius={8} />
      </section>
    </div>
  );
};
