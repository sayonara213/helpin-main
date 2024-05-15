import React from 'react';

import styles from '@/styles/container.module.scss';
import { HelpPage } from '@/components/pages/help-page/help-page';
import { getLocale } from 'next-intl/server';

const Help = async () => {
  const locale = await getLocale();

  return <HelpPage locale={locale} />;
};

export const dynamic = 'force-dynamc';

export default Help;
