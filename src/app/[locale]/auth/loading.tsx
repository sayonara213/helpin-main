'use client';

import React from 'react';

import loader from '@/assets/animations/loader.json';
import styles from '@/styles/container.module.scss';

import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <div className={styles.centerContainer} style={{ width: '100%', height: '100vh' }}>
      <Lottie
        animationData={loader}
        loop={true}
        size={40}
        style={{ width: 84, height: 84 }}
      ></Lottie>
    </div>
  );
};

export default Loading;
