import React, { Suspense } from 'react';

import { Database } from '@/lib/schema';
import { TWishlist } from '@/types/database.types';
import { Card, Group, Badge, Button, Text, CardSection, Flex } from '@mantine/core';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar/avatar';
import { Monobank } from '@/components/ui/monobank/monobank';
import { cookies } from 'next/headers';
import { IconCalendar, IconMapPin } from '@tabler/icons-react';
import { ProfileTooltip } from '../../profile-tooltip/profile-tooltip';

interface IDontaionCardProps {
  donation: TWishlist;
}

export const DontaionCard: React.FC<IDontaionCardProps> = async ({ donation }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: volunteer } = await supabase
    .from('profiles')
    .select()
    .eq('id', donation.owner_id)
    .single();

  if (!volunteer) return null;

  return (
    <Card shadow='sm' padding='xs' radius='md' withBorder>
      <CardSection>
        <Group justify='space-between' bg={'var(--color-background)'} p='xs'>
          <Link href={`/user/${volunteer.id}`} style={{ textDecoration: 'none' }}>
            <ProfileTooltip profileId={volunteer.id}>
              <Group gap={12}>
                <Avatar src={volunteer?.avatar_url} size={38} />
                <Flex direction={'column'}>
                  <Text fw={500}>{volunteer?.full_name}</Text>
                  <Flex gap={4}>
                    <IconMapPin color='var(--color-text-secondary)' size={20} />
                    <Text size='sm' c='dimmed'>
                      {donation.location}
                    </Text>
                  </Flex>
                </Flex>
              </Group>
            </ProfileTooltip>
          </Link>

          <Badge color='pink'>{new Date(donation.created_at).toLocaleDateString()}</Badge>
        </Group>
      </CardSection>

      <Text size='xl' w={500} mb={8}>
        {donation.title}
      </Text>

      <Text size='sm' c='dimmed' mb={8} lineClamp={2}>
        {donation.description}
      </Text>

      <Suspense>
        <Monobank url={donation.monobank_url} />
      </Suspense>

      <Button
        variant='light'
        fullWidth
        mt='md'
        radius='md'
        component={Link}
        href={`/wishlist/${donation.id}`}
      >
        Discover More
      </Button>
    </Card>
  );
};
