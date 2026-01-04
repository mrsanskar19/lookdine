import { nearbyVenues, nearbyPeople } from '@/data/mockData';
import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchVenues = async (): Promise<VenueData[]> => {
  await delay(800); // 800ms simulated latency
  return nearbyVenues;
};

export const fetchPeople = async (): Promise<PersonData[]> => {
  await delay(800); // 800ms simulated latency
  return nearbyPeople;
};
