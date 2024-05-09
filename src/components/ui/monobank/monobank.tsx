'use server';

import React from 'react';

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

  const parsedId = url.split('/').pop();

  try {
    const response = await fetch(`https://api.monobank.ua/bank/jar/${parsedId}`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        colorScheme: 'black',
        type: 'qrp',
      }),
    });

    console.log(url);

    const { amount, goal, ownerIcon, title, jarId } = await response.json();

    const percentage = (amount / goal) * 100;

    return (
      <Link href={`https://send.monobank.ua/jar/${jarId}`} style={{ textDecoration: 'none' }}>
        <div className={styles.container}>
          <Image src={ownerIcon} w={64} radius={'md'} />
          <Divider orientation='vertical' />
          <div className={styles.wrapper}>
            <div className={styles.texts}>
              <Paragraph>{title}</Paragraph>
              <div className={styles.prices}>
                <Paragraph color='muted' size='sm'>
                  Зібрано: {amount / 100} грн
                </Paragraph>
                <Paragraph color='muted' size='sm'>
                  Ціль: {goal / 100} грн
                </Paragraph>
              </div>
            </div>
            <Progress color='green' value={percentage} striped />
          </div>
        </div>
      </Link>
    );
  } catch (err) {
    return null;
  }
};
