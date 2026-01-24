"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export interface Story {
  id: string;
  name: string;
  avatar: string;
  hasStory: boolean;
  isUser?: boolean;
}

export const stories: Story[] = [
  { id: '1', name: 'Your Story', avatar: 'https://github.com/shadcn.png', hasStory: false, isUser: true },
  { id: '2', name: 'Priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', hasStory: true },
  { id: '3', name: 'Rahul', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', hasStory: true },
  { id: '4', name: 'Ananya', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', hasStory: true },
  { id: '5', name: 'Arjun', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', hasStory: true },
  { id: '6', name: 'La Trattoria', avatar: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100', hasStory: true },
  { id: '7', name: 'Sakura', avatar: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=100', hasStory: true },
];

export function Stories() {
  return (
    <div className="w-full bg-background/80 backdrop-blur-md z-10 border-b border-border/50 py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-5 px-6">
          {stories.map((story) => (
            <Link
              key={story.id}
              to={story.isUser ? '/stories/create' : `/stories/view/${story.id}`}
              className="flex flex-col items-center gap-2 cursor-pointer group relative"
            >
              {/* Ring Container */}
              <div className={cn(
                "relative rounded-full p-[2.5px] transition-all duration-300 group-active:scale-90",
                story.hasStory 
                  ? "bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 shadow-md shadow-orange-500/20" 
                  : "bg-muted-foreground/20"
              )}>
                <Avatar className="h-16 w-16 border-[3px] border-background transition-all">
                  <AvatarImage src={story.avatar} alt={story.name} className="object-cover" />
                  <AvatarFallback className="bg-secondary">{story.name[0]}</AvatarFallback>
                </Avatar>

                {/* Plus Icon for User Story */}
                {story.isUser && (
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-background shadow-lg text-white group-hover:scale-110 transition-transform">
                    <Plus size={12} strokeWidth={4} />
                  </div>
                )}
              </div>

              {/* Name Label */}
              <span className={cn(
                "text-[11px] font-bold tracking-tight transition-colors duration-200",
                story.hasStory ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {story.isUser ? "You" : story.name.split(' ')[0]}
              </span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}