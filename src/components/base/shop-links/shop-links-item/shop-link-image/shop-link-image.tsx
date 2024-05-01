import React, { useState } from 'react';

import Image from 'next/image';

import { IMAGES } from '@/constants/images';

interface IShopLinkImageProps {
  width?: number;
  height?: number;
  src: string;
  alt?: string;
}

export const ShopLinkImage: React.FC<IShopLinkImageProps> = ({
  width = 24,
  height = 24,
  src,
  alt = 'Shop image',
}) => {
  const [imageUrl, setImageUrl] = useState(
    `https://www.google.com/s2/favicons?domain=${src}&sz=${width}`,
  );

  const error = () => {
    setImageUrl(IMAGES.logo);
  };

  return (
    <Image width={width} height={height} loading='lazy' alt={alt} src={imageUrl} onError={error} />
  );
};
