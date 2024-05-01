import React from 'react';

import styles from './text.module.scss';

import { classes } from '@/utils/styles';

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'md' | 'bg' | 'lg' | 'title';
  color?: 'default' | 'muted' | 'link' | 'white' | 'secondary';
  weight?: 'normal' | 'medium' | 'bold';
  uppercase?: boolean;
}

export const Paragraph: React.FC<ITextProps> = ({
  children,
  size = 'base',
  color = 'default',
  weight = 'normal',
  uppercase = false,
  ...props
}) => {
  return (
    <p
      className={classes(
        styles.global,
        styles[size],
        styles[color],
        styles[weight],
        uppercase && styles.uppercase,
        { ...props }.className,
      )}
    >
      {children}
    </p>
  );
};
