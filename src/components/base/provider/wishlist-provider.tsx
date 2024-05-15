'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { TWishlist, TWishlistItem } from '@/types/database.types';

interface IWishlistProviderProps {
  wishlist: TWishlist;
  items: TWishlistItem[];
  isOwn: boolean;
  children: React.ReactNode;
}

interface IWishlistContext {
  wishlist: TWishlist;
  setWishlist: (wishlist: TWishlist) => void;
  items: TWishlistItem[];
  isEditing: boolean;
  isOwnWishlist: boolean;
  setItems: (items: TWishlistItem[]) => void;
  addItem: (item: TWishlistItem) => void;
  deleteItem: (itemId: number) => void;
  updateItem: (item: TWishlistItem) => void;
  setIsEditing: (isEditing: boolean) => void;
  orderChanged: boolean;
  setOrderChanged: (orderChanged: boolean) => void;
  reorder: (items: TWishlistItem[]) => void;
  isChat: boolean;
  setIsChat: (isChat: boolean) => void;
}

const initialWishlist: IWishlistContext = {
  wishlist: {
    id: 0,
    owner_id: '',
    title: '',
    created_at: '',
    updated_at: '',
    description: null,
    location: null,
    bg_image: null,
    monobank_url: null,
  },
  setWishlist: () => {},
  items: [],
  isOwnWishlist: false,
  isEditing: false,
  setItems: () => {},
  addItem: () => {},
  deleteItem: () => {},
  updateItem: () => {},
  setIsEditing: () => {},
  orderChanged: false,
  setOrderChanged: () => {},
  reorder: () => {},
  isChat: false,
  setIsChat: () => {},
};

const WishlistContext = createContext<IWishlistContext>(initialWishlist);

export const WishlistProvider: React.FC<IWishlistProviderProps> = ({
  wishlist,
  items,
  children,
  isOwn,
}) => {
  const [wishlistState, setWishlistState] = useState<TWishlist>(wishlist);
  const [wishlistItems, setWishlistItems] = useState<TWishlistItem[]>(items);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);
  const [isChat, setIsChat] = useState<boolean>(false);

  const addItem = (item: TWishlistItem) => {
    const newItems = [...wishlistItems, { ...item, priority: items.length }];

    setWishlistItems(newItems);
  };

  const deleteItem = (itemId: number) => {
    setWishlistItems((prevItems: TWishlistItem[]) =>
      prevItems.filter((item) => item.id !== itemId),
    );
  };

  const updateItem = (updatedItem: TWishlistItem) => {
    setWishlistItems((prevItems: TWishlistItem[]) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  const reorder = (items: TWishlistItem[]) => {
    const reorderedItems = items.map((item, index) => ({ ...item, priority: index }));
    setWishlistItems(reorderedItems);
    setOrderChanged(true);
  };

  useEffect(() => {
    setWishlistItems(items);
  }, [items]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist: wishlistState,
        setWishlist: setWishlistState,
        items: wishlistItems,
        setItems: setWishlistItems,
        addItem,
        deleteItem,
        updateItem,
        isEditing,
        setIsEditing,
        isOwnWishlist: isOwn,
        orderChanged,
        setOrderChanged,
        reorder,
        isChat,
        setIsChat,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export default WishlistProvider;
