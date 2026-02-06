import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Story {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  media: string;
  createdAt: string;
  isViewed?: boolean;
  expiresAt: string;
}

interface StoriesBarProps {
  stories: Story[];
  currentUserId?: string;
  onCreateStory?: () => void;
}

export function StoriesBar({ stories, currentUserId, onCreateStory }: StoriesBarProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (storyId: string) => {
    setImageErrors(prev => new Set(prev).add(storyId));
  };

  return (
    <div className="w-full overflow-x-auto hide-scrollbar -mx-4 px-4">
      <div className="flex gap-4 py-2">
        {/* Create Story Button */}
        {onCreateStory && (
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <Button
              onClick={onCreateStory}
              className="relative h-16 w-16 rounded-full p-0 border-2 border-dashed border-muted-foreground/30 hover:border-primary transition-colors"
              variant="ghost"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5" />
              <Plus className="h-6 w-6 text-primary" />
            </Button>
            <span className="text-xs font-medium">Your Story</span>
          </div>
        )}

        {/* Stories */}
        {stories.map((story) => (
          <Link
            key={story.id}
            to={`/stories/view/${story.id}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div className="relative">
              {/* Gradient Border for Unread Stories */}
              <div
                className={cn(
                  "absolute inset-0 rounded-full p-0.5 bg-gradient-to-tr",
                  story.isViewed
                    ? "from-muted to-muted"
                    : "from-pink-500 via-purple-500 to-indigo-500"
                )}
              >
                <div className="w-full h-full rounded-full bg-background" />
              </div>
              
              {/* Avatar */}
              <Avatar className="h-16 w-16 relative border-2 border-background">
                {!imageErrors.has(story.id) ? (
                  <AvatarImage
                    src={story.user.avatar}
                    alt={story.user.name}
                    onError={() => handleImageError(story.id)}
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                    {story.user.name[0]}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="text-center max-w-[60px]">
              <p className="text-xs font-medium truncate">
                {story.user.username || story.user.name}
              </p>
            </div>
          </Link>
        ))}

        {/* Loading Placeholder */}
        {stories.length === 0 && (
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
                <div className="w-12 h-3 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
