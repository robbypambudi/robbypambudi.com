import type { Metadata } from 'next';

import PublicationsContent from '@/app/publications/publications-content';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Peer-reviewed publications by Robby Ulung Pambudi — SoftwareX DiLLeMA and IEEE ONCON steganography.',
};

export default function PublicationsPage() {
  return <PublicationsContent />;
}
