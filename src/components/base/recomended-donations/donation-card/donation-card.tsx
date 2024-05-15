import React, { Suspense } from 'react';

import { IWishlistJoinProfile, TWishlist } from '@/types/database.types';
import { Card, Group, Badge, Button, Text, CardSection, Flex } from '@mantine/core';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar/avatar';
import { Monobank } from '@/components/ui/monobank/monobank';
import { IconMapPin } from '@tabler/icons-react';
import { ProfileTooltip } from '../../profile-tooltip/profile-tooltip';

interface IDontaionCardProps {
  donation: IWishlistJoinProfile;
}

export const DontaionCard: React.FC<IDontaionCardProps> = async ({ donation }) => {
  const volunteer = donation.profiles;

  if (!volunteer) {
    return;
  }

  return (
    <Card shadow='sm' padding='xs' radius='md' withBorder>
      <CardSection>
        <Group justify='space-between' bg={'var(--color-background)'} p='xs'>
          <Link href={`/profile/${volunteer.id}`} style={{ textDecoration: 'none' }}>
            <ProfileTooltip profileId={volunteer.id}>
              <Group gap={12}>
                <Avatar src={volunteer?.avatar_url} size={38} />
                <Flex direction={'column'}>
                  <Flex gap={8}>
                    <Text fw={500}>{volunteer?.full_name}</Text>
                    {volunteer.is_verified && <Text>⭐</Text>}
                  </Flex>
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

      <Flex direction={'column'} justify={'space-between'} flex={1}>
        <div>
          <Text size='xl' w={500} my={8}>
            {donation.title}
          </Text>

          <Text size='sm' c='dimmed' mb={8} lineClamp={2}>
            {donation.description}
          </Text>
        </div>

        <div>
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
        </div>
      </Flex>
    </Card>
  );
};
