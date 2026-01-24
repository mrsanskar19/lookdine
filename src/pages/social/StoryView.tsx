"use client";

import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Send, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  // Interaction: Auto-advance progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate("/"), 500); // Auto-close when done
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total duration

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white overflow-hidden relative">
      
      {/* 🟢 Top Navigation Overlay */}
      <div className="absolute top-0 w-full z-20 p-4 space-y-4 bg-gradient-to-b from-black/60 to-transparent">
        {/* Progress Bar */}
        <Progress value={progress} className="h-1 bg-white/20" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div className="flex flex-col">
              <span className="text-sm font-bold">User {id}</span>
              <span className="text-[10px] opacity-70 uppercase tracking-widest">2h ago</span>
            </div>
          </div>

          {/* Right Top Actions */}
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
              <MoreVertical className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 🖼 Working Content Area */}
      <div className="flex-1 relative flex items-center justify-center">
        <img 
          src={`https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800`} 
          alt="Story Content"
          className="w-full h-full object-cover md:max-w-md md:rounded-3xl shadow-2xl"
        />
        
        {/* Tap areas for interaction */}
        <div className="absolute inset-0 flex">
          <div className="w-1/3 h-full cursor-pointer" onClick={() => setProgress(0)} title="Rewind" />
          <div className="w-2/3 h-full cursor-pointer" onClick={() => setProgress(100)} title="Skip" />
        </div>
      </div>

      {/* 📥 Bottom Interaction Bar */}
      {/* <div className="absolute bottom-0 w-full p-6 flex items-center gap-4 bg-gradient-to-t from-black/60 to-transparent">
        <input 
          type="text" 
          placeholder="Send a message..." 
          className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm outline-none focus:bg-white/20 transition-all"
        />
        <Button variant="ghost" size="icon" className="rounded-full text-white">
          <Heart className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-white">
          <Send className="h-6 w-6" />
        </Button>
      </div> */}
    </div>
  );
}