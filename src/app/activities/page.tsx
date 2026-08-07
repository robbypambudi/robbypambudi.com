import type { Metadata } from 'next';

import ActivitiesContent from '@/app/activities/activities-content';

export const metadata: Metadata = {
  title: 'Activities',
  description:
    'Engineering leadership and community activities by Robby Ulung Pambudi — DigiFlood, ISPO, WasteTrack, Bangkit, and more.',
};

export default function ActivitiesPage() {
  return <ActivitiesContent />;
}
