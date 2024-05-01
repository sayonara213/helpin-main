'use server';

import React, { useEffect } from 'react';

import styles from './monobank.module.scss';
import { Divider, Image, Progress } from '@mantine/core';
import { Paragraph } from '../text/text';
import Link from 'next/link';

interface IMonobankProps {
  url: string | null;
}

export const Monobank: React.FC<IMonobankProps> = async ({ url }) => {
  if (!url) {
    return null;
  }

  const id = url.split('/').pop();

  const response = await fetch(
    `https://api.monobank.ua/bank/jar/4myaFGuX77n4Y9SwswSbacoBozgbDJSL`,
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        colorScheme: 'black',
        type: 'qrp',
      }),
    },
  );

  const data = await response.json();

  if (!data) {
    return null;
  }

  const percentage = (data.amount / data.goal) * 100;

  return (
    <Link href={`https://send.monobank.ua/jar/${data.jarId}`} style={{ textDecoration: 'none' }}>
      <div className={styles.container}>
        <Image src={data.ownerIcon} w={64} radius={'md'} />
        <Divider orientation='vertical' />
        <div className={styles.wrapper}>
          <div className={styles.texts}>
            <Paragraph>{data.title}</Paragraph>
            <div className={styles.prices}>
              <Paragraph color='muted' size='sm'>
                Зібрано: {data.amount / 100} грн
              </Paragraph>
              <Paragraph color='muted' size='sm'>
                Ціль: {data.goal / 100} грн
              </Paragraph>
            </div>
          </div>
          <Progress value={percentage} striped />
        </div>
      </div>
    </Link>
  );
};
