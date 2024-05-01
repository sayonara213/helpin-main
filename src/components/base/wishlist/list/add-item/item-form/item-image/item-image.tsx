import React, { useCallback, useEffect, useRef, useState } from 'react';

import Image, { ImageLoader } from 'next/image';

import styles from './item-image.module.scss';

import { notify } from '@/utils/toast';

import { Input, Loader, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface IAddItemImageProps {
  link: string | null;
  setFile: (file: File | null) => void;
  setImageToUpload: (image: string) => void;
  initialImage?: string;
  setDisabled: (disabled: boolean) => void;
}

export const AddItemImage: React.FC<IAddItemImageProps> = ({
  link,
  setFile,
  setImageToUpload,
  initialImage,
  setDisabled,
}) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('WishlistPage.add.form.fields.image');

  const handleFetchImage = useCallback(async () => {
    if (!link) return;
    setIsLoading(true);
    setDisabled(true);

    try {
      const res = await fetch(`/api/scrape`, {
        method: 'POST',
        body: JSON.stringify({ url: link }),
      });
      const data = await res.json();

      setImage(data.imageUrl);
      setImageToUpload(data.imageUrl);
    } catch (error) {
      notify('error', 'Error processing link, set image manually');
    }

    setIsLoading(false);
    setDisabled(false);
  }, [link]);

  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
    setFile(file);
  };

  const deleteImage = () => {
    setImage(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    handleFetchImage();
  }, [link]);

  const loader: ImageLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <Input.Wrapper label={t('label')} description={t('description')}>
      <div className={styles.container} onClick={triggerFileInput}>
        {image ? (
          <>
            <IconTrash color='var(--text-color)' onClick={deleteImage} />
            <Image
              src={image}
              alt='item-image'
              width={160}
              height={160}
              loader={loader}
              unoptimized
            />
          </>
        ) : (
          <Text>{t('action')}</Text>
        )}
        {isLoading && (
          <div className={styles.overlay}>
            <Loader />
          </div>
        )}
      </div>
      <input
        type='file'
        hidden
        ref={fileInputRef}
        onChange={changeImage}
        accept='image/png,image/jpeg'
      />
    </Input.Wrapper>
  );
};
