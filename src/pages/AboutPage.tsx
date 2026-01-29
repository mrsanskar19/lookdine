import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, MapPin, Star, Heart, Award, Target, 
  Globe, Shield, ChefHat, Clock, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <AppLayout title="About Us">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Heart className="h-4 w-4" />
            Connecting People Through Food
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to
            <span className="text-primary"> LookDine</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to bring people together through amazing dining experiences. 
            Discover great restaurants, connect with food lovers, and create memorable moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/nearby">Explore Restaurants</Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">1,200+</div>
              <div className="text-sm text-muted-foreground">Restaurants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm text-muted-foreground">Cities</div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="w-fit">Our Mission</Badge>
            <h2 className="text-3xl font-bold">
              Making Dining Experiences
              <span className="text-primary"> Memorable</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              LookDine was born from a simple idea: connecting people who love food with the best dining experiences in their city. 
              We believe that great meals are more than just food – they're about connection, discovery, and creating lasting memories.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Discover Amazing Places</h3>
                  <p className="text-sm text-muted-foreground">
                    Find hidden gems and popular spots tailored to your taste
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Connect with Food Lovers</h3>
                  <p className="text-sm text-muted-foreground">
                    Join a community of people who share your passion for great food
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Share Your Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Review restaurants and help others discover amazing places
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
              <Heart className="h-24 w-24 text-primary" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center">
            <Badge className="w-fit">Our Values</Badge>
            <h2 className="text-3xl font-bold mt-4">What Drives Us</h2>
            <p className="text-muted-foreground mt-2">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Trust & Safety</h3>
                <p className="text-sm text-muted-foreground">
                  We ensure every restaurant and review is authentic and verified
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ChefHat className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  We partner only with the best restaurants that meet our standards
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Our platform is built by food lovers, for food lovers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          <div className="text-center">
            <Badge className="w-fit">Features</Badge>
            <h2 className="text-3xl font-bold mt-4">Everything You Need</h2>
            <p className="text-muted-foreground mt-2">
              Powerful features to enhance your dining experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Smart Discovery</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI-powered recommendations based on your preferences and dining history
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Instant Booking</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Reserve tables instantly with real-time availability
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Social Features</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connect with friends, share experiences, and discover what's trending
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Restaurant Analytics</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      For restaurant owners: insights to grow your business
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Culinary Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of food lovers discovering amazing restaurants
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Join LookDine</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/nearby">Explore Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
