import { Database } from '@/lib/schema';

export type TProfile = Database['public']['Tables']['profiles']['Row'];
export type TWishlist = Database['public']['Tables']['wishlists']['Row'];
export type TWishlistItem = Database['public']['Tables']['items']['Row'];
export type TShop = Database['public']['Tables']['shops']['Row'];
export type TFriendship = Database['public']['Tables']['friendships']['Row'];
export type TSharedWishlist = Database['public']['Tables']['shared_wishlists']['Row'];
export type TSuggestion = Database['public']['Tables']['suggestions']['Row'];

export interface ISharedWishlistJoinProfile extends TSharedWishlist {
  friend_profile: TProfile;
}

export interface IFiriendshipProfile extends TFriendship {
  profiles: TProfile | null;
}
