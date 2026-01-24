"use client";

import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/contexts/theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Function to cycle through: light -> dark -> system
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="relative rounded-full hover:bg-accent transition-all active:scale-90"
    >
      {/* ☀️ Light Icon */}
      <Sun className={cn(
        "h-[1.2rem] w-[1.2rem] transition-all",
        theme === 'light' ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0 absolute"
      )} />
      
      {/* 🌙 Dark Icon */}
      <Moon className={cn(
        "h-[1.2rem] w-[1.2rem] transition-all",
        theme === 'dark' ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0 absolute"
      )} />

      {/* 🖥️ System Icon */}
      <Monitor className={cn(
        "h-[1.2rem] w-[1.2rem] transition-all",
        theme === 'system' ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0 absolute"
      )} />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// Utility to merge classes safely
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}