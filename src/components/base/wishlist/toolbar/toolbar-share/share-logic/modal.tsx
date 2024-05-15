import { Center, Flex, SegmentedControl, Stack } from '@mantine/core';
import { IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { SharePost } from './share-post/share-post';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

type TSocial = 'instagram' | 'twitter';

const socials = [
  {
    label: (
      <Center style={{ gap: 10 }}>
        <IconBrandInstagram />
        <span>Instagram</span>
      </Center>
    ),
    value: 'instagram',
  },
  {
    label: (
      <Center style={{ gap: 10 }}>
        <IconBrandX />
        <span>X (Twitter)</span>
      </Center>
    ),
    value: 'twitter',
  },
];

export const ShareModal = () => {
  const [step, setStep] = useState(0);
  const [social, setSocial] = useState<TSocial>();
  const [swiper, setSwiper] = useState<any>(null);

  const handleChange = (value: string) => {
    setSocial(value as TSocial);
    swiper.slideTo(socials.findIndex((item) => item.value === value));
  };

  const socialsSlides = [
    <SwiperSlide key={0}>
      <SharePost social={'instagram'} />
    </SwiperSlide>,
    <SwiperSlide key={1}>
      <SharePost social={'twitter'} />
    </SwiperSlide>,
  ];

  return (
    <Stack>
      <SegmentedControl value={social} data={socials} onChange={handleChange} />
      <Flex maw={'100%'}>
        <Swiper onSwiper={setSwiper}>{socialsSlides.map((slide) => slide)}</Swiper>
      </Flex>
    </Stack>
  );
};
