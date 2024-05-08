'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';

import styles from './profile-tooltip.module.scss';
import { Avatar, Flex, HoverCard, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';
import Link from 'next/link';

interface IProfileTooltipProps {
  children: React.ReactNode;
  profileId: string;
}

export const ProfileTooltip: React.FC<IProfileTooltipProps> = memo(({ children, profileId }) => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClientComponentClient<Database>();

  const fetchUser = useCallback(async () => {
    const { data } = await supabase.from('profiles').select().eq('id', profileId).single();

    setProfile(data);
    setIsLoading(false);
  }, [profileId]);

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return;

  return (
    <HoverCard shadow='md'>
      <HoverCard.Target>{children}</HoverCard.Target>
      <HoverCard.Dropdown>
        <Link href={`/profile/${profile?.id}`} style={{ textDecoration: 'none' }}>
          <Flex gap={12}>
            <Avatar src={profile?.avatar_url} size={42} />
            <Flex direction='column'>
              <Flex gap={8}>
                <Text>{profile?.full_name}</Text>
                {profile?.is_volunteer && <Text c={'dimmed'}>Volunteer</Text>}
                {profile?.is_verified && <Text c={'dimmed'}>⭐️</Text>}
              </Flex>
              {profile?.user_name && (
                <Text c='dimmed' size='sm'>
                  @{profile?.user_name}
                </Text>
              )}
            </Flex>
          </Flex>
          {profile?.bio && (
            <Text size='sm' mt={8}>
              {profile?.bio}
            </Text>
          )}
        </Link>
      </HoverCard.Dropdown>
    </HoverCard>
  );
});
