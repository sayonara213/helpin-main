import styles from '@/styles/app/app.module.scss';
import { Skeleton } from '@mantine/core';

export const AppLoading = () => {
  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <div style={{ marginBottom: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Skeleton
            width={'20%'}
            height={43}
            radius={8}
            style={{ marginBottom: 12 }}
            color='blue'
          />
          <Skeleton width={'100%'} radius={8} style={{ flex: 1 }} />
        </div>
        <div>
          <Skeleton width={'20%'} height={43} radius={8} style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: '16px' }}>
            <Skeleton width={'40%'} height={250} radius={8} />
            <Skeleton width={'60%'} height={250} radius={8} />
          </div>
        </div>
      </section>
      <section className={styles.linksWrapper}>
        <Skeleton width={'100%'} height={43} radius={8} style={{ marginBottom: 12 }} color='blue' />
        <Skeleton width={'120px'} height={'100%'} radius={8} />
      </section>
    </div>
  );
};
