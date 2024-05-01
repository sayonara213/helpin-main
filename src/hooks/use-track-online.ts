import { Database } from '@/lib/schema';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useCallback, useEffect } from 'react';

export const useTrackOnline = (sharedWishlistId: number, userId: string, friendId: string) => {
  const [isFriendOnline, setIsFriendOnline] = useState<boolean>(false);

  const CHANNEL_NAME = `shared-wishlist-presence:${sharedWishlistId}`;

  const supabase = createClientComponentClient<Database>();

  const handleRealtime = useCallback(() => {
    const channel = supabase
      .channel(CHANNEL_NAME, {
        config: {
          presence: {
            key: userId,
          },
        },
      })
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const isOnline = !!newState[friendId]; // Check if friend is online

        setIsFriendOnline(isOnline);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        if (key === friendId) {
          setIsFriendOnline(false);
        }
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        if (key === friendId) {
          setIsFriendOnline(true);
        }
      });

    return channel;
  }, [supabase]);

  useEffect(() => {
    const channel = handleRealtime();

    const userStatus = {
      user: userId,
    };

    channel.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return;
      }

      await channel.track(userStatus);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  return isFriendOnline;
};
