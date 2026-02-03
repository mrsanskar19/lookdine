import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { VenueList } from '@/components/venue/VenueList';
import { PersonCard } from '@/components/social/PersonCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppMode } from '@/context/AppModeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
<<<<<<< HEAD
<<<<<<< HEAD
import { Users, Utensils, Coffee, MapPin } from 'lucide-react';
=======
import { Users, Utensils, Coffee, MapPin, List, Map } from 'lucide-react';
>>>>>>> 094e5ef (Updated project code)
=======
import { Users, Utensils, Coffee, MapPin, List, Map } from 'lucide-react';
>>>>>>> 0895931 (Initial project setup)
import { MapComponent } from '@/components/map/MapComponent';

import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';

const NearbyPage = () => {
  const { isTeenMode } = useAppMode();
  const [activeTab, setActiveTab] = useState('all');
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
>>>>>>> 094e5ef (Updated project code)
=======
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
>>>>>>> 0895931 (Initial project setup)
  const [connectionFilter, setConnectionFilter] = useState<'all' | 'dating' | 'friendship'>('all');
  const [venues, setVenues] = useState<VenueData[]>([]);
  const [people, setPeople] = useState<PersonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
<<<<<<< HEAD
<<<<<<< HEAD
        const [venuesData, peopleData] = await Promise.all([
          fetch('https://randomuser.me/api/?results=10').then((res) => res.json()),
          fetch('https://randomuser.me/api/?results=10').then((res) => res.json()),
        ]);
        setVenues(venuesData);
        setPeople(peopleData);
      } catch (error) {
        console.error("Failed to fetch data", error);
=======
=======
>>>>>>> 0895931 (Initial project setup)
        // Mock venue data
        const mockVenues = [
          {
            id: '1',
            name: 'The Garden Cafe',
            cuisine: 'Coffee & Breakfast',
            rating: 4.5,
            distance: '0.5 km',
            priceLevel: '$$',
            crowdStatus: 'chill' as const,
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
            peopleNow: 12,
            coordinates: { lat: 40.7128, lng: -74.0060 }
          },
          {
            id: '2',
            name: 'Sushi Master',
            cuisine: 'Japanese',
            rating: 4.8,
            distance: '1.2 km',
            priceLevel: '$$$',
            crowdStatus: 'busy' as const,
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fdcd35?w=400',
            peopleNow: 28,
            coordinates: { lat: 40.7580, lng: -73.9855 }
          }
        ];

        // Mock people data
        const mockPeople = [
          {
            id: '1',
            name: 'Sarah Chen',
            age: 28,
            distance: '0.8 km',
            interests: ['Coffee', 'Books', 'Travel'],
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            connectionType: 'friendship' as const,
            coordinates: { lat: 40.7260, lng: -73.9897 }
          },
          {
            id: '2',
            name: 'Mike Johnson',
            age: 32,
            distance: '1.5 km',
            interests: ['Music', 'Hiking', 'Photography'],
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            connectionType: 'dating' as const,
            coordinates: { lat: 40.7489, lng: -73.9680 }
          }
        ];

        setVenues(mockVenues);
        setPeople(mockPeople);
<<<<<<< HEAD
      } catch (error) {
        console.error("Failed to fetch data", error);
        // Set empty arrays as fallback
        setVenues([]);
        setPeople([]);
>>>>>>> 094e5ef (Updated project code)
=======
>>>>>>> 0895931 (Initial project setup)
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredPeople = people.filter((person) => {
    if (connectionFilter === 'all') return true;
    return person.connectionType === connectionFilter;
  });

  if (loading) {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
      <AppLayout title="Nearby">
=======
      <AppLayout title="Explore">
>>>>>>> 094e5ef (Updated project code)
=======
      <AppLayout title="Explore">
>>>>>>> 0895931 (Initial project setup)
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </AppLayout>
    );
  }

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <AppLayout  title="Nearby">
      <div className="space-y-4">
        {/* Map Section */}
        <MapComponent venues={venues} people={!isTeenMode ? people : []} />
=======
    <AppLayout  title="Explore">
=======
    <AppLayout title="Explore">
>>>>>>> 0895931 (Initial project setup)
      <div className="space-y-4">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 rounded-xl bg-muted p-1">
          <Button
            variant={viewMode === 'map' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('map')}
            className="flex-1"
          >
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="flex-1"
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
        </div>

        {/* Map or List Section */}
        {viewMode === 'map' ? (
          <MapComponent venues={venues} people={!isTeenMode ? people : []} />
        ) : (
          <div className="space-y-4">
            {/* Venue List */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Cafés & Restaurants Nearby</h2>
              </div>
              <VenueList venues={venues} />
            </div>

            {/* People Section - Adults only */}
            {!isTeenMode && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">People Nearby</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {people.slice(0, 4).map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
<<<<<<< HEAD
>>>>>>> 094e5ef (Updated project code)
=======
>>>>>>> 0895931 (Initial project setup)

        {/* Location indicator */}
        <div className="flex items-center gap-2 rounded-xl bg-primary/5 p-3">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Current Location</p>
            <p className="text-xs text-muted-foreground">Koramangala, Bangalore</p>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            Change
          </Button>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted p-1">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
              All
            </TabsTrigger>
            <TabsTrigger value="places" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
              <Utensils className="h-4 w-4 mr-1" />
              Places
            </TabsTrigger>
            {!isTeenMode && (
              <TabsTrigger value="people" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
                <Users className="h-4 w-4 mr-1" />
                People
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-4">
            {/* Cafes & Restaurants Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Cafés & Restaurants Nearby</h2>
              </div>
            <VenueList venues={venues} horizontal />
            </div>

            {/* People Section - Adults only */}
            {!isTeenMode && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">People Nearby</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {people.slice(0, 4).map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="places" className="space-y-4 mt-4">
            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
              {['All', 'Cafés', 'Restaurants', 'Bars', 'Rooftops'].map((cat) => (
                <Badge
                  key={cat}
                  variant={cat === 'All' ? 'default' : 'secondary'}
                  className="cursor-pointer whitespace-nowrap px-3 py-1.5"
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <VenueList venues={venues} />
          </TabsContent>

          {!isTeenMode && (
            <TabsContent value="people" className="space-y-4 mt-4">
              {/* Connection type filter */}
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'dating', label: '💖 Dating' },
                  { key: 'friendship', label: '👋 Friendship' },
                ].map((filter) => (
                  <Badge
                    key={filter.key}
                    variant={connectionFilter === filter.key ? 'default' : 'secondary'}
                    className="cursor-pointer px-3 py-1.5"
                    onClick={() => setConnectionFilter(filter.key as typeof connectionFilter)}
                  >
                    {filter.label}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {filteredPeople.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default NearbyPage;
