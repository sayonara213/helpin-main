import { EnglisgMd, UkrainianMd } from '@/constants/md';
import { TypographyStylesProvider } from '@mantine/core';
import React from 'react';
import Markdown from 'react-markdown';

interface IHelpPageProps {
  locale: string;
}

export const HelpPage: React.FC<IHelpPageProps> = ({ locale }) => {
  return (
    <TypographyStylesProvider>
      <Markdown>{locale === 'uk' ? UkrainianMd : EnglisgMd}</Markdown>
    </TypographyStylesProvider>
  );
};
