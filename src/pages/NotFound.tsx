"use client";

import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <AppLayout showHeader={false} className="!p-0 !overflow-hidden">
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-6 relative overflow-hidden">
        
        {/* 🟢 Background Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

        {/* 🔵 Animated SVG Illustration */}
        <div className="relative mb-12 group">
          <svg
            width="320"
            height="180"
            viewBox="0 0 320 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Number 404 with Floating Animation */}
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="text-9xl font-black fill-primary transition-all duration-700 group-hover:tracking-widest"
              style={{ filter: "drop-shadow(0px 10px 20px rgba(var(--primary), 0.3))" }}
            >
              404
            </text>
            
            {/* Animated Floating Orbit */}
            <circle cx="160" cy="90" r="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-muted-foreground/30 animate-[spin_20s_linear_infinite]" />
            
            {/* Pulsating Glow Dot */}
            <circle cx="80" cy="40" r="6" className="fill-primary animate-ping" />
          </svg>
        </div>

        {/* 🟠 Content Section */}
        <div className="text-center space-y-4 max-w-md z-10">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Lost in Space<span className="text-primary">.</span></h2>
          <p className="text-muted-foreground font-medium leading-relaxed">
            The page you are looking for has been moved to a different galaxy or never existed.
          </p>
        </div>

        {/* 🔘 Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Button 
            onClick={() => navigate("/")} 
            className="flex-1 h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all"
          >
            <Home className="mr-2 h-5 w-5" /> HOME
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)} 
            className="flex-1 h-14 rounded-2xl font-black text-lg border-2 active:scale-95 transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> GO BACK
          </Button>
        </div>

        {/* 🏢 Search Suggestion */}
        <button 
          onClick={() => navigate("/search")}
          className="mt-12 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <Search size={14} /> Try searching for it
        </button>

      </div>
    </AppLayout>
  );
}