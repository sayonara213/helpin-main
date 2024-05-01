import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './avatar.module.scss';

import { API_URL } from '@/constants/api';
import { TProfile } from '@/types/database.types';

import { LoadingOverlay, Modal, Skeleton } from '@mantine/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { IconTrash, IconUpload } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { AvatarEdit } from './avatar-edit/avatar-edit';

interface IAvatarProps {
  supabase: SupabaseClient;
  profile: TProfile;
  setProfile: (profile: TProfile) => void;
}

export const ProfileAvatar: React.FC<IAvatarProps> = ({ supabase, profile, setProfile }) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const changeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file) return;

    setAvatar(file);
    router.refresh();
  };

  const setDefaultAvatar = async () => {
    setIsUploading(true);
    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${API_URL.avatars}/default.png`;
    await supabase
      .from('profiles')
      .update({
        avatar_url: fileUrl,
      })
      .eq('id', profile.id);

    setProfile({ ...profile, avatar_url: fileUrl });
    setIsUploading(false);
    router.refresh();
  };

  const uploadAvatar = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    const fileName = `avatar${Date.now()}`;
    const uploadedUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${API_URL.avatars}/${profile.id}/${fileName}`;

    await supabase.storage.from('avatars').upload(`${profile.id}/${fileName}`, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (profile.avatar_url !== uploadedUrl) {
      await supabase
        .from('profiles')
        .update({
          avatar_url: uploadedUrl,
        })
        .eq('id', profile.id);
    }

    setIsUploading(false);
    setProfile({ ...profile, avatar_url: uploadedUrl });
    router.refresh();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    //uploadAvatar();
    if (avatar) {
      open();
    }
  }, [avatar]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.delete} onClick={setDefaultAvatar}>
        <IconTrash size={16} color='var(--text-color)' />
      </div>
      <div className={styles.avatarWrapper} onClick={handleClick}>
        <LoadingOverlay visible={isUploading} overlayProps={{ blur: 2 }} />
        <div className={styles.upload}>
          <IconUpload size={24} color='white' />
        </div>
        {profile.avatar_url ? (
          <Image
            width={128}
            height={128}
            src={profile.avatar_url}
            alt='avatar'
            priority
            className={styles.avatar}
          />
        ) : (
          <Skeleton width={128} height={128} circle />
        )}
      </div>
      <input
        type='file'
        onChange={changeAvatar}
        accept='image/png,image/jpeg'
        hidden
        ref={fileInputRef}
      />
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        {avatar && (
          <AvatarEdit
            src={URL.createObjectURL(avatar)}
            setAvatar={setAvatar}
            close={close}
            uploadAvatar={uploadAvatar}
          />
        )}
      </Modal>
    </div>
  );
};
