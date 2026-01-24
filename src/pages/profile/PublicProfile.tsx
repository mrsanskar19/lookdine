"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, UserPlus, MapPin, Briefcase, Heart, 
  ShieldCheck, Zap, ArrowLeft, Share2, Check, MoreHorizontal
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function PublicProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProfile({
        name: 'Chef Marco',
        username: username,
        age: 28,
        bio: 'Executive Chef at The Grand Bistro. Passionate about fusion Italian-Indian cuisine and underground dining experiences. 🇮🇹🇮🇳',
        work: 'Executive Chef at Leela’s',
        location: 'Baramati, MH',
        followerCount: '4.2k',
        connectionCount: '892',
        interests: ['Fine Dining', 'Pasta Art', 'Wine Pairing', 'Tech'],
        avatar: 'https://i.pravatar.cc/300?u=chef',
        coverImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200'
      });
      setLoading(false);
    }, 800);
  }, [username]);

  if (loading) return <LoadingSpinner />;

  return (
    /* Force-resetting padding to allow cover image to touch edges */
    <AppLayout showHeader={false} className="!p-0">
      <div className="min-h-screen bg-background text-foreground pb-20">
        
        {/* 🟢 Glassmorphism Sticky Nav */}
        <nav className="fixed top-0 w-full z-50 px-4 py-3 bg-background/20 backdrop-blur-xl border-b border-white/10 flex justify-between items-center transition-all">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-background/20 hover:bg-background/40">
            <ArrowLeft size={22} />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-background/20"><Share2 size={20} /></Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-background/20 text-rose-500"><Heart size={20} /></Button>
          </div>
        </nav>

        {/* 🔵 Cover Section with Animated Gradient */}
        <div className="relative h-64 md:h-[400px] w-full overflow-hidden">
          <img src={profile.coverImage} className="w-full h-full object-cover scale-105" alt="Cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32" />
        </div>

        {/* 🟠 Profile Identity Content */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative -mt-20 md:-mt-32 flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            {/* Avatar with Status Ring */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 to-yellow-400 rounded-[44px] blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <img 
                src={profile.avatar} 
                className="relative w-36 h-36 md:w-52 md:h-52 rounded-[40px] border-[6px] border-background object-cover shadow-2xl"
                alt="Avatar"
              />
              <div className="absolute bottom-4 right-4 bg-primary p-2 rounded-2xl border-4 border-background shadow-xl">
                <ShieldCheck size={20} className="text-primary-foreground" />
              </div>
            </div>

            {/* Name & Username */}
            <div className="mb-2 space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{profile.name}</h1>
                <Zap size={28} className="text-orange-500 fill-orange-500 animate-pulse" />
              </div>
              <p className="text-primary font-black text-xl md:text-2xl tracking-tight">@{profile.username}, {profile.age}</p>
            </div>
          </div>

          {/* 🔘 Main Grid Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left: Bio & Details */}
            <div className="lg:col-span-2 space-y-10">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                {profile.bio}
              </p>

              <div className="flex gap-10 py-8 border-y border-border/50">
                <StatItem label="Followers" value={profile.followerCount} />
                <StatItem label="Connections" value={profile.connectionCount} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailCard icon={Briefcase} label={profile.work} />
                <DetailCard icon={MapPin} label={profile.location} isLive />
              </div>
            </div>

            {/* Right: Actions & Tags */}
            <div className="space-y-6">
              <div className="flex gap-3">
                <Button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={cn(
                    "flex-1 h-16 rounded-3xl font-black text-lg transition-all active:scale-95",
                    isFollowing ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                  )}
                >
                  {isFollowing ? <Check className="mr-2" /> : <UserPlus className="mr-2" />}
                  {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                </Button>
                <Button variant="outline" className="h-16 w-16 rounded-3xl border-2">
                  <MessageSquare size={24} />
                </Button>
              </div>

              <div className="p-8 bg-muted/30 border border-border/50 rounded-[40px] backdrop-blur-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map(tag => (
                    <Badge key={tag} variant="secondary" className="px-4 py-2 rounded-xl border-none font-bold">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// --- Internal Professional Components ---

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="group cursor-pointer">
      <h4 className="text-3xl font-black tracking-tighter group-hover:text-primary transition-colors">{value}</h4>
      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">{label}</p>
    </div>
  );
}

function DetailCard({ icon: Icon, label, isLive }: { icon: any, label: string, isLive?: boolean }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-2xl border border-border/10">
      <div className={cn(
        "p-3 rounded-xl",
        isLive ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
      )}>
        <Icon size={20} />
      </div>
      <span className="font-bold tracking-tight">{label}</span>
      {isLive && <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping ml-auto" />}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest opacity-50">Fetching Profile</p>
      </div>
    </div>
  );
}