'use client';

import React from 'react';

import { BurgerNav, BurgerNavLoader } from './burger/burger';
import { NavbarBody } from './navbar-body/navbar-body';
import styles from './navbar.module.scss';

import { classes } from '@/utils/styles';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';

const sidebarVariants = {
  expanded: { width: '270px' },
  collapsed: { width: '80px' },
};

export interface INavbarItem {
  name: string;
  icon: React.ReactNode;
  link?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Navbar = () => {
  const [isExpanded, { toggle }] = useDisclosure(false);

  const isMobile = useMediaQuery('(max-width: 576px)', false);

  return (
    <>
      <div className={classes(styles.burger, styles.mobile)}>
        <BurgerNavLoader />
      </div>
      {isMobile ? (
        <div className={styles.burger}>
          <BurgerNav />
        </div>
      ) : (
        <motion.div
          initial='collapsed'
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={sidebarVariants}
          transition={{ duration: 0.4, ease: 'backInOut' }}
          className={styles.navbar}
        >
          <NavbarBody isExpanded={isExpanded} toggleNav={toggle} />
        </motion.div>
      )}
    </>
  );
};
