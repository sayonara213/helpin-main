import React from 'react';

import styles from './heading.module.scss';

import { Logo } from '@/components/ui/icon/logo';

import { AnimatePresence, Variants, motion } from 'framer-motion';
import { Text } from '@mantine/core';
import { IconLayoutSidebarRightExpand } from '@tabler/icons-react';

interface IHeadingProps {
  isExpanded: boolean;
  toggleNav: () => void;
}

const textVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

export const Heading: React.FC<IHeadingProps> = ({ isExpanded, toggleNav }) => {
  return (
    <div className={styles.heading}>
      <button onClick={toggleNav} className={isExpanded ? '' : styles.rotate}>
        <IconLayoutSidebarRightExpand color='white' />
      </button>
      <div className={styles.wrapper}>
        <Logo />
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial='hide' animate='show' exit='hide' variants={textVariants}>
              <Text size='xxl' fw='bold' c='white'>
                Needin
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
