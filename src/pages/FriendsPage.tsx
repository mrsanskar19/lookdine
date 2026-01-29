import { AppLayout } from '@/components/layout/AppLayout';
import { FriendsList } from '@/components/social/FriendsList';

export default function FriendsPage() {
  return (
    <AppLayout title="Friends">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Friends & Connections</h1>
          <p className="text-muted-foreground">
            Manage your friends, followers, and follow requests.
          </p>
        </div>
        
        <FriendsList />
      </div>
    </AppLayout>
  );
}
