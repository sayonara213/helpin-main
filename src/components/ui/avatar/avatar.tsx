import React from 'react';

import Image from 'next/image';

interface IAvatarProps {
  src: string;
  size: number;
  className?: string;
}

export const Avatar: React.FC<IAvatarProps> = ({ src, size = 24, className }) => {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
      alt={'avatar'}
      className={className}
    />
  );
};
