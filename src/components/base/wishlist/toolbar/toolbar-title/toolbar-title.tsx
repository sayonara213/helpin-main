import React, { useEffect, useState } from 'react';

import styles from './toolbar-title.module.scss';

import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { Database } from '@/lib/schema';
import { TWishlist } from '@/types/database.types';
import { classes } from '@/utils/styles';
import { notify } from '@/utils/toast';

import { Loader } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const ToolbarTitle = () => {
  const { wishlist, setWishlist, isEditing, setIsEditing } = useWishlist();
  const [prevTitle, setPrevTitle] = useState<string>(wishlist.title);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = createClientComponentClient<Database>();

  const updateWishlist = async (wishlist: TWishlist) => {
    if (wishlist.title === prevTitle) return;
    setIsLoading(true);
    const { error } = await supabase
      .from('wishlists')
      .update({ title: wishlist.title })
      .eq('id', wishlist.id);

    if (error) {
      notify('error', 'Error updating wishlist title');
      return;
    }
    setIsLoading(false);

    setPrevTitle(wishlist.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWishlist({ ...wishlist, title: e.target.value });
  };

  const handleClose = () => {
    setWishlist({ ...wishlist, title: prevTitle });
    setIsEditing(false);
  };

  useEffect(() => {
    !isEditing && updateWishlist(wishlist);
  }, [isEditing]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader size={16} />}
      <input
        value={wishlist.title}
        onChange={handleTitleChange}
        disabled={!isEditing}
        className={classes(styles.input, isLoading && styles.loading)}
      />
    </div>
  );
};
