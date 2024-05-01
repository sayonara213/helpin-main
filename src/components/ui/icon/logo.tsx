import React from 'react';

import Image from 'next/image';

import styles from '@/components/ui/text/text.module.scss';
import { IMAGES } from '@/constants/images';

interface IIconProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: number;
  className?: string;
}

export const Logo: React.FC<IIconProps> = ({ size = 24, onClick, className }) => {
  return <Image src={IMAGES.logo} alt='Logo' width={size} height={size} priority />;
};
