import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'validation.required',
  },
  string: {
    min: ({ path, min }) => ({ key: 'validation.min', values: { path: path, min: min } }),
    max: ({ path, max }) => ({ key: 'validation.max', values: { path: path, max: max } }),
    url: 'validation.url',
  },
});

const email = yup.string().email('validation.email').required('validation.email');
const password = yup
  .string()
  .min(6, 'validation.password')
  .max(30, 'validation.password')
  .required();

const userName = yup.string().when('userName', {
  is: (value: string) => value?.length,
  then: (rule) => rule.min(3).max(20).required(),
});
const fullName = yup.string().min(3).max(30).required();
const bio = yup.string().max(300);
const linkName = yup.string().required();
export const linkUrl = yup.string().url().required();

export const authSchema = yup.object({
  email,
  password,
});

export const additionalAuthSchema = yup.object({
  fullName: yup.string().min(3).max(30).required(),
  birthDate: yup.date().required(),
});

export const addLinkSchema = yup.object({
  linkName,
  linkUrl,
});

export const profileSchema = yup.object().shape(
  {
    userName: userName,
    fullName: fullName,
    bio: bio,
  },
  [['userName', 'userName']],
);

export const wishlistItemSchema = yup.object({
  name: yup.string().required(),
  description: bio,
  price: yup.number().optional(),
  link: yup.string().url().optional(),
  imageUrl: yup.string().optional(),
});

export const wishlistSchema = yup.object({
  title: yup.string().required().min(3).max(15),
  description: yup.string().optional(),
  sharedWith: yup.string().optional(),
  monobankUrl: yup.string().url().optional(),
  bgImage: yup.string().optional(),
  location: yup.string().optional(),
});
