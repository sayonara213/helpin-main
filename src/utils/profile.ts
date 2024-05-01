import { TProfile } from '@/types/database.types';
import { IProfileForm } from '@/types/form.types';
import { toNormalCase } from './text';

export const normalizeProfileForm = (formData: IProfileForm, profile: TProfile): IProfileForm => {
  const normalized: IProfileForm = {
    ...(formData.userName &&
      formData.userName !== profile.user_name && { user_name: formData.userName.toLowerCase() }),
    ...(formData.fullName &&
      formData.fullName !== profile.full_name && { full_name: toNormalCase(formData.fullName) }),
    ...(formData.bio && formData.bio !== profile.bio && { bio: formData.bio }),
  };

  return normalized;
};
