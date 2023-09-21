// @SEE https://www.npmjs.com/package/next-seo#default-seo-configuration

import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.robbypambudi.com/',
    siteName: 'Robby Pambudi',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  titleTemplate: '%s | Robby Pambudi',
  description:
    'Explore my thoughts, experiences, and personal interests. Get to know more about me and what I enjoy in life.',
  defaultTitle: 'Robby Pambudi',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};

export default config;
