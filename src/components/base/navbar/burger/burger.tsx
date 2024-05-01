import React from 'react';

import styles from './burger.module.scss';

import { NavbarBody } from '../navbar-body/navbar-body';
import { ThemeSwitch } from '../theme-switch/theme-switch';

import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { classes } from '@/utils/styles';

import { Burger, Drawer, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const BurgerNav: React.FC = () => {
  const [isExpanded, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={isExpanded} onClose={close} title='Menu'>
        <NavbarBody isExpanded={isExpanded} toggleNav={toggle} closeOnClick />
      </Drawer>
      <div className={styles.nav}>
        <Burger opened={isExpanded} onClick={toggle} color='white' />
        <div className={styles.title}>
          <CustomIcon name='logo' size={28} />
          <Text fw='bold' size='lg' c='white'>
            Wishy
          </Text>
        </div>
        <ThemeSwitch isExpanded={false} />
      </div>
    </>
  );
};

export const BurgerNavLoader: React.FC = () => {
  return (
    <div className={classes(styles.nav, styles.center)}>
      <div className={styles.title}>
        <CustomIcon name='logo' size={28} />
        <Text fw='bold' size='lg' c='white'>
          Wishy
        </Text>
      </div>
    </div>
  );
};
