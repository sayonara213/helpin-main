import { DateValue } from '@mantine/dates';

export interface IAuthForm {
  email: string;
  password: string;

  [key: string]: string;
}

export interface IAdditionalAuthForm {
  fullName: string;
  birthDate: DateValue;
}

export interface IAddLinkForm {
  linkName: string;
  linkUrl: string;

  [key: string]: string;
}

export interface IProfileForm {
  fullName?: string;
  userName?: string;
  bio?: string;

  [key: string]: string | undefined;
}

export interface IWishlistForm {
  title: string;
  description?: string;
  sharedWith?: string;
  monobankUrl?: string;
  bgImage?: string;
}
