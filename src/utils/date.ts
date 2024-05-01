import ukLocale from 'date-fns/locale/uk';
import enLocale from 'date-fns/locale/en-US';

import { formatDistanceToNow } from 'date-fns';

export const formatDateToNow = (date: string, locale: string) => {
  const dateObj = new Date(date);

  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: locale === 'uk' ? (ukLocale as never) : (enLocale as never),
  });
};

export const formatBirthdayToNow = (date: string, locale: string) => {
  const dateObj = new Date(date);

  dateObj.setFullYear(new Date().getFullYear());

  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: locale === 'uk' ? (ukLocale as never) : (enLocale as never),
  });
};
