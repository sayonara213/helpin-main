'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';

import { Avatar, Flex, HoverCard, Skeleton, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';
import Link from 'next/link';

interface IProfileTooltipProps {
  children: React.ReactNode;
  profileId: string;
}

const ProfileTooltip: React.FC<IProfileTooltipProps> = ({ children, profileId }) => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const supabase = createClientComponentClient<Database>();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    const { data } = await supabase.from('profiles').select().eq('id', profileId).single();

    setProfile(data);

    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, [profileId]);

  useEffect(() => {
    if (isOpen) {
      fetchUser();
    }
  }, [isOpen]);

  return (
    <HoverCard shadow='md' onOpen={() => setIsOpen(true)}>
      <HoverCard.Target>{children}</HoverCard.Target>
      <HoverCard.Dropdown>
        {isLoading ? (
          <TooltipSkeleton />
        ) : (
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
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default memo(ProfileTooltip);

const TooltipSkeleton = () => (
  <HoverCard.Dropdown>
    <Flex gap={12} w={'240px'}>
      <Skeleton radius={'100%'} w={42} h={42} />
      <Flex direction='column' gap={8}>
        <Flex gap={8}>
          <Skeleton w={'100px'} h={14} radius={4} />
          <Skeleton w={'40px'} h={14} radius={4} />
        </Flex>
        <Skeleton w={'60px'} h={12} radius={4} mb={20} />
      </Flex>
    </Flex>
    <Skeleton w={'100%'} h={42} radius={4} />
  </HoverCard.Dropdown>
);
