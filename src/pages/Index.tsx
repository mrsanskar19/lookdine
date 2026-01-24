import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { VenueList } from '@/components/venue/VenueList';
import { heroData, featuredVenues, nearbyPeople } from '@/data/mockData';
import { PersonCard } from '@/components/social/PersonCard';
import { ChevronRight, Sparkles, Users, MapPin, Utensils, User, LogOut } from 'lucide-react';
import { useAppMode } from '@/context/AppModeContext';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Stories } from '@/components/social/Stories';

const Index = () => {
  const { isTeenMode } = useAppMode();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AppLayout title="Home" className='px-4' showHeader={true}>
      <Stories/>
      <div className="space-y-6 md:space-y-8">
        {/* Hero Section */}
        <div className="relative -mx-4 -mt-4 md:mx-0 md:mt-0 md:rounded-2xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-transparent z-10" />
          <img
            src={heroData.image}
            alt="LookDine Hero"
            className="h-56 md:h-[400px] w-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-8">
            {isAuthenticated ? (
              <>
                <h1 className="text-2xl md:text-4xl font-bold text-card mb-1">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-sm md:text-lg text-card/80 mb-4 md:mb-6">
                  Ready to explore amazing dining experiences?
                </p>
                <div className="flex gap-2">
                  <Link to="/nearby">
                    <Button variant="hero" size="sm" className="md:h-10 md:px-6">
                      <MapPin className="h-4 w-4 mr-2" />
                      Explore Nearby
                    </Button>
                  </Link>
                  <Link to="/book">
                    <Button variant="glass" size="sm" className="md:h-10 md:px-6">
                      <Utensils className="h-4 w-4 mr-2" />
                      Book a Table
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-4xl font-bold text-card mb-1">
                  {heroData.title}
                </h1>
                <p className="text-sm md:text-lg text-card/80 mb-4 md:mb-6">
                  {heroData.subtitle}
                </p>
                <div className="flex gap-2">
                  <Link to="/login">
                    <Button variant="hero" size="sm" className="md:h-10 md:px-6">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="glass" size="sm" className="md:h-10 md:px-6">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8 space-y-6">
            {/* Featured Venues */}
            <VenueList
              venues={featuredVenues}
              horizontal
              title="Popular Near You"
            />
             {/* Trending Cafes */}
             <VenueList
              venues={featuredVenues.slice(0, 3)}
              title="Trending Cafés"
            />
          </div>

          <div className="md:col-span-4 space-y-6">
            {/* People Nearby Section - Only for Adults */}
            {!isTeenMode && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">People Nearby</h2>
                  <Link to="/nearby" className="flex items-center text-sm text-primary font-medium">
                    See all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                  {nearbyPeople.slice(0, 4).map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
