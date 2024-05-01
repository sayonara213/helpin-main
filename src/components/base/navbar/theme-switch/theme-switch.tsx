'use client';

import styles from './theme-switch.module.scss';

import { classes } from '@/utils/styles';

import { Text, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface IThemeSwitchProps {
  isExpanded?: boolean;
}

const textVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

export const ThemeSwitch: React.FC<IThemeSwitchProps> = ({ isExpanded }) => {
  const { toggleColorScheme } = useMantineColorScheme();
  const t = useTranslations('Navigation');

  return (
    <li className={classes(styles.wrapper, styles.button)}>
      <div className={styles.icon} onClick={toggleColorScheme}>
        <>
          <IconSun size={24} color='white' />
          <IconMoon size={24} color='white' />
        </>
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
              <Text fw='bold' c='white'>
                {t('themeSwitch')}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};
