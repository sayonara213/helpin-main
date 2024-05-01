import React from 'react';

import { useRouter } from 'next/navigation';

import styles from './navbar-item.module.scss';

import { classes } from '@/utils/styles';
import { toNormalCase } from '@/utils/text';

import { AnimatePresence, Variants, motion } from 'framer-motion';
import { Text } from '@mantine/core';

interface INavbarItemProps {
  name: string;
  icon: React.ReactNode;
  link?: string;
  onClick?: () => void;
  isExpanded: boolean;
  toggleNav?: () => void;
  children?: React.ReactNode;
}

const textVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

const childrenVariants: Variants = {
  show: {
    opacity: 1,
    marginTop: '8px',
    height: 'auto',
    transition: { duration: 0.3, delay: 0.3, ease: 'easeInOut' },
  },
  hide: {
    opacity: 0,
    height: 0,
    marginTop: '0px',
    transition: { duration: 0.3, ease: 'easeInOut' },
    transitionEnd: {
      display: 'none',
    },
  },
};

export const NavbarItem: React.FC<INavbarItemProps> = ({
  name,
  icon,
  link,
  onClick,
  isExpanded,
  children,
  toggleNav,
}) => {
  const router = useRouter();

  const click = () => {
    onClick && onClick();
    link && router.push(link);
    if (isExpanded && toggleNav) toggleNav();
  };

  return (
    <li>
      <div className={classes(styles.item, (onClick || link) && styles.hover)} onClick={click}>
        {icon}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              variants={textVariants}
              transition={{ duration: 0.3, delay: 0.15 }}
              className={styles.span}
            >
              <Text fw={'bold'} c='white'>
                {toNormalCase(name)}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {children && (
        <motion.div
          initial='hide'
          animate={isExpanded ? 'show' : 'hide'}
          variants={childrenVariants}
        >
          {children}
        </motion.div>
      )}
    </li>
  );
};
