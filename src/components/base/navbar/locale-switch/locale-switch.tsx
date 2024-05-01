'use client';

import React, { useTransition } from 'react';
import { NavbarItem } from '../navbar-item/navbar-item';
import { useLocale, useTranslations } from 'next-intl';
import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { useRouter, usePathname } from '@/navigation';

interface INavbarSignOutProps {
  isExpanded: boolean;
}

export const LocaleSwitch: React.FC<INavbarSignOutProps> = ({ isExpanded }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations('Navigation');
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = () => {
    startTransition(() => {
      router.replace(pathname, { locale: locale === 'en' ? 'uk' : 'en' });
    });
  };

  return (
    <NavbarItem
      name={t('localeSwitch')}
      icon={<CustomIcon name={locale === 'uk' ? 'ukraine' : 'usa'} size={24} />}
      onClick={handleLocaleChange}
      isExpanded={isExpanded}
    />
  );
};
