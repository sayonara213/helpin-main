import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useWishlist } from '../../provider/wishlist-provider';

import { Database } from '@/lib/schema';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const useWishlistListState = () => {
  const { items, reorder, setItems, wishlist, isOwnWishlist, addItem, updateItem, deleteItem } =
    useWishlist();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const supabase = createClientComponentClient<Database>();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select()
      .eq('wishlist_id', wishlist.id)
      .order(searchParams.get('sort') || 'priority', {
        ascending: searchParams.get('order') === 'asc' || searchParams.has('order') === false,
      });

    if (error || !data) {
      return;
    }

    setItems(data);
    setIsLoading(false);
  };

  const handleDeleteItem = async (itemId: number) => {
    const { error, data } = await supabase.from('items').delete().eq('id', itemId);

    if (error) {
      throw new Error('Error deleting item');
    }
  };

  const isWishlistEmpty = items.length === 0 && !isLoading;

  return {
    wishlist,
    items,
    isLoading,
    isWishlistEmpty,
    handleDeleteItem,
    reorder,
    isOwnWishlist,
  };
};
