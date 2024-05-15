import { useAuth } from '@/components/base/provider/auth-provider';
import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { Database } from '@/lib/schema';
import { TShare } from '@/types/database.types';
import { notify } from '@/utils/toast';
import { ActionIcon, Button, Skeleton, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import styles from './share-post.module.scss';
import { IconRefresh } from '@tabler/icons-react';

interface ISharePostProps {
  social: 'instagram' | 'twitter';
}

export const SharePost: React.FC<ISharePostProps> = ({ social }) => {
  const [post, setPost] = useState<TShare>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const { wishlist } = useWishlist();
  const user = useAuth();

  const supabase = createClientComponentClient<Database>();

  const getPost = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('shares')
      .select('*')
      .eq('wishlist_id', wishlist.id)
      .eq('created_by', user.id)
      .eq('social', social);

    if (error) {
      notify('error', error.message);
    }

    if (data) {
      setPost(data[0]);
    }

    setIsLoading(false);
  };

  const createPost = async () => {
    try {
      setIsCreating(true);
      const data = await fetch('/api/open-ai-share', {
        method: 'POST',
        body: JSON.stringify({
          wishlistId: wishlist.id,
          userId: user.id,
          share: post,
          description: wishlist.description,
          title: wishlist.title,
          location: wishlist.location,
          social: social,
        }),
      });

      const { share } = await data.json();

      setPost(share);
      setIsCreating(false);
    } catch {
      notify('error', 'err');
      setIsCreating(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return isLoading ? (
    <SharePostSkeleton />
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.regenerate}>
        <ActionIcon
          onClick={createPost}
          variant='gradient'
          gradient={{ from: '#a17e25', to: '#af5d11' }}
        >
          <IconRefresh size={20} />
        </ActionIcon>
      </div>
      {post && (
        <>
          <Image src={post?.image_url!} width={200} height={200} alt='image' />
          <Text size='md'>{post?.title}</Text>
          <Text size='sm' c={'dimmed'}>
            {post?.description}
          </Text>
        </>
      )}

      <Button onClick={createPost} fullWidth loading={isCreating} disabled={isCreating}>
        Create
      </Button>
    </div>
  );
};

const SharePostSkeleton = () => (
  <div className={styles.wrapper}>
    <Skeleton width={200} height={200} radius={12} />
    <Skeleton width={'100%'} height={20} radius={8} />
    <Skeleton width={'100%'} height={60} radius={8} />
  </div>
);
