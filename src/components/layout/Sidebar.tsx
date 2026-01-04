import { Home, MapPin, Calendar, MessageCircle, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MapPin, label: 'Nearby', path: '/nearby' },
  { icon: Calendar, label: 'Book', path: '/book' },
  { icon: MessageCircle, label: 'Chat', path: '/chat' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r border-border/50 bg-card sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground text-xl">
             L
           </div>
           <span className="text-xl font-bold">LookDine</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </Button>
      </div>
    </aside>
  );
}
