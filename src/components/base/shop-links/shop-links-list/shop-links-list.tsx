'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { ShopLinksItemAdd } from '../shop-links-add/shop-links-item-add';
import { ShopLinksItem } from '../shop-links-item/shop-links-item';

import styles from '../shop-links.module.scss';
import { TShop } from '@/types/database.types';

interface IShopLinksListProps {
  userId: string;
  initialShops: TShop[] | [];
}

export const ShopLinksList: React.FC<IShopLinksListProps> = ({ initialShops }) => {
  const [shopLinks, setShopLinks] = useState<TShop[]>(initialShops);

  const deleteShopLink = (id: number) => {
    setShopLinks(shopLinks.filter((shop) => shop.id !== id));
  };

  const addShopLink = (shop: TShop) => {
    setShopLinks([...shopLinks, shop]);
  };

  return (
    <AnimatePresence mode='popLayout'>
      <motion.ul className={styles.list}>
        <motion.li
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring' }}
        >
          <ShopLinksItemAdd addLink={addShopLink} />
        </motion.li>
        {shopLinks.map((shop) => (
          <motion.li
            key={shop.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring' }}
          >
            <ShopLinksItem shop={shop} deleteLink={deleteShopLink} />
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};
