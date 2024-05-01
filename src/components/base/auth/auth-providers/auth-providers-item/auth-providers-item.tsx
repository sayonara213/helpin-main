'use client';

import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { toNormalCase } from '@/utils/text';
import { Button } from '@mantine/core';
import { Provider } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';
import React from 'react';

interface IAuthProvidersItemProps {
  name: Provider;
  onClick: (provider: Provider) => void;
  disabled?: boolean;
}

export const AuthProvidersItem: React.FC<IAuthProvidersItemProps> = ({
  name,
  onClick,
  disabled,
}) => {
  const t = useTranslations('AuthPage.providers');

  return (
    <Button
      rightSection={<CustomIcon name={name as never} size={20} />}
      variant='outline'
      fullWidth
      onClick={() => onClick(name)}
      disabled={disabled}
    >
      {t('label')} {toNormalCase(name)}
    </Button>
  );
};
