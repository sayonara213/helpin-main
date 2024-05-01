'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import styles from './shop-links-item.module.scss';

import { Database } from '@/lib/schema';
import { TShop } from '@/types/database.types';
import { extractBaseDomain } from '@/utils/text';

import { Skeleton, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { IconTrash } from '@tabler/icons-react';

interface IShopLinksItemProps {
  shop: TShop;
  deleteLink: (id: number) => void;
}

const buttonVariants = {
  initial: {
    scale: 1,
    transition: { duration: 0.15 },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 700,
      damping: 10,
    },
  },
};

export const ShopLinksItem: React.FC<IShopLinksItemProps> = ({ shop, deleteLink }) => {
  const { link_name, link_url } = shop;
  const [isHovered, setIsHovered] = useState(false);

  const supabase = createClientComponentClient<Database>();

  const handleDelete = async () => {
    await supabase.from('shops').delete().eq('id', shop.id);
    deleteLink(shop.id);
  };

  return (
    <motion.div
      variants={buttonVariants}
      initial='initial'
      whileHover='hover'
      whileTap='initial'
      className={styles.wrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div onClick={handleDelete} className={styles.delete}>
        <IconTrash color='var(--text-color)' size={16} />
      </div>

      <a className={styles.link} href={link_url} target='_blank'>
        <Image
          width={32}
          height={32}
          src={`https://www.google.com/s2/favicons?domain=${extractBaseDomain(link_url)}&sz=64`}
          loading='lazy'
          alt='icon'
        />
        <Text size='sm'>{link_name}</Text>
      </a>
    </motion.div>
  );
};
