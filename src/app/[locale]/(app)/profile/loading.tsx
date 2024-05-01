import { ProfileSkeleton } from '@/components/base/profile/skeleton/profile-skeleton';
import styles from '@/styles/container.module.scss';

const ProfileLoading = () => {
  return (
    <div className={styles.centerContainer}>
      <ProfileSkeleton />
    </div>
  );
};

export default ProfileLoading;
