'use server';

import React from 'react';

import styles from './monobank.module.scss';
import { Divider, Image, Progress } from '@mantine/core';
import { Paragraph } from '../text/text';
import Link from 'next/link';
import monobank from '@/assets/images/monobank.png';

interface IMonobankProps {
  url: string | null;
}

const fallback = {
  amount: 1450000,
  goal: 10000000,
  ownerIcon: monobank.src,
  title: 'Збір коштів',
  jarId: '123',
};

export const Monobank: React.FC<IMonobankProps> = async ({ url }) => {
  if (!url) {
    return null;
  }

  const parsedId = url.split('/').pop();

  try {
    const response = await fetch(`https://api.monobank.ua/bank/jar/${1}`, {
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

    const res = await response.json();

    const { amount, goal, ownerIcon, title, jarId } = res.errCode ? fallback : res;

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
