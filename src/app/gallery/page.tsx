import type { Metadata } from 'next';

import GalleryContent from '@/app/gallery/gallery-content';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Frames and friends — trips, ordinary nights, and the people in each photo with Robby Ulung Pambudi.',
};

export default function GalleryPage() {
  return <GalleryContent />;
}
