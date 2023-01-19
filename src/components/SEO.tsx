import { NextSeo, NextSeoProps } from 'next-seo';

type SEOProps = {
  title: string;
  description: string;
} & NextSeoProps;

export default function SEO({ title, description, ...rest }: SEOProps) {
  return (
    <NextSeo
      title={title}
      description={description}
      {...rest}
      openGraph={{
        type: 'website',
        url: 'https://robbypambudi.com',
        title: 'Robby Pambudi',
        description:
          "Welcome to robbypambudi's portfolio. visit and got a discussion about technologies",
        images: [
          {
            url: 'https://robbypambudi.com/images/og-logo.png',
            width: 800,
            height: 600,
            alt: 'Robby Pambudi Portfolio',
          },
        ],
      }}
    />
  );
}
