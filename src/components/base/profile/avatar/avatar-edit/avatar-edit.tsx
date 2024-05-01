import React, { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { Button } from '@mantine/core';

import styles from './avatar-edit.module.scss';
import getCroppedImg from '@/utils/image';

interface IAvatarEditProps {
  src: string;
  close: () => void;
  setAvatar: (avatar: File) => void;
  uploadAvatar: (file: File) => void;
}

export const AvatarEdit: React.FC<IAvatarEditProps> = ({ src, close, setAvatar, uploadAvatar }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleCroppedImage = async () => {
    const file = await getCroppedImg(src, croppedAreaPixels!);
    console.log(file);

    const convertBlobToFile = (blob: Blob, fileName: string): File => {
      const file = new File([blob], fileName, {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
      return file;
    };

    uploadAvatar(convertBlobToFile(file?.file!, 'avatar.png'));
    close();
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.edit}>
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          cropShape='round'
        />
      </div>
      <Button onClick={handleCroppedImage}>Save</Button>
    </div>
  );
};
