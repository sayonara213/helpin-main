import heart from '@/assets/icons/heart.png';
import logo from '@/assets/icons/logo.svg';
import star from '@/assets/icons/star.png';
import emptyPresent from '@/assets/images/empty-present.svg';
import google from '@/assets/icons/google.png';
import discord from '@/assets/icons/discord.png';
import ukraine from '@/assets/icons/ukraine.svg';
import usa from '@/assets/icons/usa.svg';

export const IMAGES = {
  logo,
  star,
  heart,
  emptyPresent,
  google,
  discord,
  ukraine,
  usa,
};

export type TImage = keyof typeof IMAGES;
