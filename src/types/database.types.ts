import { Database } from '@/lib/schema';

export type TProfile = Database['public']['Tables']['profiles']['Row'];
export type TWishlist = Database['public']['Tables']['wishlists']['Row'];
export type TWishlistItem = Database['public']['Tables']['items']['Row'];

export type TSuggestion = Database['public']['Tables']['suggestions']['Row'];

export type TShare = Database['public']['Tables']['shares']['Row'];

export interface IWishlistJoinProfile extends TWishlist {
  profiles?: TProfile | null;
}
