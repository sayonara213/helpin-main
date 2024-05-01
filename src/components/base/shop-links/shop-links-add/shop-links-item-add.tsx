import React, { useState } from 'react';

import { AddLinkForm } from './add-link-form/add-link-form';
import styles from './shop-links-item-add.module.scss';

import { TShop } from '@/types/database.types';

import { Popover, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface IShopLinksItemAddProps {
  addLink: (link: TShop) => void;
}

export const ShopLinksItemAdd: React.FC<IShopLinksItemAddProps> = ({ addLink }) => {
  const [isOpened, setIsOpened] = useState(false);
  const t = useTranslations('HomePage.shops');

  return (
    <Popover
      width={220}
      position='bottom'
      withArrow
      shadow='md'
      opened={isOpened}
      onChange={setIsOpened}
    >
      <Popover.Target>
        <div className={styles.button} onClick={() => setIsOpened((o) => !o)}>
          <IconPlus color='var(--text-color)' size={32} />
          <Text size='sm'>{t('add')}</Text>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <AddLinkForm addLink={addLink} closePopover={() => setIsOpened(false)} />
      </Popover.Dropdown>
    </Popover>
  );
};
