"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { storiesService, Story } from "@/services/api/stories";
import { useToast } from "@/hooks/use-toast";

export function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      // Skip API call since endpoints don't exist, use mock data directly
      setStories([
        {
          id: '1',
          user: {
            id: 'current',
            name: 'Your Story',
            username: 'you',
            avatar: 'https://github.com/shadcn.png'
          },
          media: '',
          mediaType: 'image',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          privacy: 'public',
          settings: {
            allowComments: true,
            allowReactions: true,
            saveToProfile: true,
            autoDelete: true
          }
        },
        {
          id: '2',
          user: {
            id: '2',
            name: 'Priya',
            username: 'priya',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
          },
          media: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
          mediaType: 'image',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
          isViewed: false,
          privacy: 'public',
          settings: {
            allowComments: true,
            allowReactions: true,
            saveToProfile: true,
            autoDelete: true
          }
        },
        {
          id: '3',
          user: {
            id: '3',
            name: 'Rahul',
            username: 'rahul',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
          },
          media: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
          mediaType: 'image',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
          isViewed: true,
          privacy: 'public',
          settings: {
            allowComments: true,
            allowReactions: true,
            saveToProfile: true,
            autoDelete: true
          }
        }
      ]);
    } catch (error) {
      console.error('Failed to load stories:', error);
      // Set empty array as fallback
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStory = () => {
    // Navigate to create story page
    window.location.href = '/stories/create';
  };

  if (loading) {
    return (
      <div className="w-full bg-background/80 backdrop-blur-md z-10 border-b border-border/50 py-4">
        <div className="flex gap-4 px-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
              <div className="w-12 h-3 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background/80 backdrop-blur-md z-10 border-b border-border/50 py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-5 px-6">
          {/* Create Story Button */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer group relative"
            onClick={handleCreateStory}
          >
            <div className="relative rounded-full p-[2.5px] bg-muted-foreground/20 transition-all duration-300 group-active:scale-90">
              <Avatar className="h-16 w-16 border-[3px] border-background transition-all">
                <AvatarFallback className="bg-secondary">You</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-background shadow-lg text-white group-hover:scale-110 transition-transform">
                <Plus size={12} strokeWidth={4} />
              </div>
            </div>
            <span className="text-[11px] font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              You
            </span>
          </div>

          {/* Stories */}
          {stories.map((story) => (
            <Link
              key={story.id}
              to={`/stories/view/${story.id}`}
              className="flex flex-col items-center gap-2 cursor-pointer group relative"
              onClick={() => {
                // Skip API call since endpoints don't exist, just update local state
                if (!story.isViewed) {
                  setStories(prev => 
                    prev.map(s => s.id === story.id ? { ...s, isViewed: true } : s)
                  );
                }
              }}
            >
              {/* Ring Container */}
              <div className={cn(
                "relative rounded-full p-[2.5px] transition-all duration-300 group-active:scale-90",
                story.isViewed 
                  ? "bg-muted-foreground/20" 
                  : "bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 shadow-md shadow-orange-500/20"
              )}>
                <Avatar className="h-16 w-16 border-[3px] border-background transition-all">
                  <AvatarImage src={story.user.avatar} alt={story.user.name} className="object-cover" />
                  <AvatarFallback className="bg-secondary">{story.user.name[0]}</AvatarFallback>
                </Avatar>
              </div>

              {/* Name Label */}
              <span className={cn(
                "text-[11px] font-bold tracking-tight transition-colors duration-200",
                story.isViewed ? "text-muted-foreground" : "text-foreground"
              )}>
                {story.user.username || story.user.name.split(' ')[0]}
              </span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}