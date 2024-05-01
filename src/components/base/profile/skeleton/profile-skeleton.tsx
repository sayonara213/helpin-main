import styles from '../profile.module.scss';

import { Skeleton } from '@mantine/core';

export const ProfileSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Skeleton width={132} height={132} radius={'100%'} />
      </div>
      <div className={styles.usernameWrapper} style={{ gap: 6 }}>
        <Skeleton width={'50%'} height={20} radius={4} />
        <Skeleton width={'30%'} height={20} radius={4} />
        <Skeleton width={'35%'} height={20} radius={4} />
      </div>
      <div>
        <Skeleton width={'50%'} height={20} radius={4} style={{ marginBottom: 4 }} />
        <Skeleton width={'100%'} height={40} radius={4} style={{ marginBottom: 12 }} />
      </div>
      <div>
        <Skeleton width={'50%'} height={20} radius={4} style={{ marginBottom: 4 }} />
        <Skeleton width={'100%'} height={40} radius={4} style={{ marginBottom: 12 }} />
      </div>
      <div>
        <Skeleton width={'50%'} height={20} radius={4} style={{ marginBottom: 4 }} />
        <Skeleton width={'100%'} height={60} radius={4} style={{ marginBottom: 24 }} />
      </div>
      <Skeleton width={'100%'} height={40} radius={4} style={{ marginBottom: 12 }} />
      <Skeleton width={'100%'} height={40} radius={4} />
    </div>
  );
};
