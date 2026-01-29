import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, UserMinus, Users, UserCheck } from 'lucide-react';
import { friendsService, Friend, FollowRequest } from '@/services/api/friends';
import { useToast } from '@/hooks/use-toast';

interface FriendsListProps {
  userId?: string;
}

export function FriendsList({ userId }: FriendsListProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [followers, setFollowers] = useState<Friend[]>([]);
  const [following, setFollowing] = useState<Friend[]>([]);
  const [followRequests, setFollowRequests] = useState<FollowRequest[]>([]);
  const [stats, setStats] = useState({ followers: 0, following: 0, mutual: 0 });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFriendsData();
  }, [userId]);

  const loadFriendsData = async () => {
    try {
      setLoading(true);
      const [friendsData, followersData, followingData, requestsData, statsData] = await Promise.all([
        friendsService.getFriends(),
        friendsService.getFollowers(),
        friendsService.getFollowing(),
        friendsService.getFollowRequests(),
        friendsService.getFriendsStats()
      ]);

      setFriends(friendsData?.data || []);
      setFollowers(followersData?.data || []);
      setFollowing(followingData?.data || []);
      setFollowRequests(requestsData?.data || []);
      setStats(statsData?.data || { followers: 0, following: 0, mutual: 0 });
    } catch (error) {
      console.error('Failed to load friends data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFollow = async (targetUserId: string, isCurrentlyFollowing: boolean) => {
    try {
      const result = await friendsService.toggleFollow(targetUserId);
      const newFollowingState = result?.data?.isFollowing;

      // Update local state
      setFollowing(prev => 
        newFollowingState 
          ? [...prev, { id: targetUserId, name: '', username: '', isFollowing: true, isFollower: false, isMutual: false, createdAt: '' }]
          : prev.filter(f => f.id !== targetUserId)
      );

      toast({
        title: newFollowingState ? "Following" : "Unfollowed",
        description: newFollowingState ? "You are now following this user" : "You have unfollowed this user"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update follow status"
      });
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await friendsService.acceptFollowRequest(requestId);
      setFollowRequests(prev => prev.filter(req => req.id !== requestId));
      toast({
        title: "Request Accepted",
        description: "Follow request has been accepted"
      });
      loadFriendsData(); // Refresh data
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to accept request"
      });
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      await friendsService.declineFollowRequest(requestId);
      setFollowRequests(prev => prev.filter(req => req.id !== requestId));
      toast({
        title: "Request Declined",
        description: "Follow request has been declined"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to decline request"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 animate-pulse bg-muted rounded"></div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 animate-pulse bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.following}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.mutual}</div>
            <div className="text-sm text-muted-foreground">Mutual</div>
          </CardContent>
        </Card>
      </div>

      {/* Follow Requests */}
      {followRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Follow Requests ({followRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {followRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={request.fromUser.avatar} />
                    <AvatarFallback>{request.fromUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{request.fromUser.name}</div>
                    <div className="text-sm text-muted-foreground">@{request.fromUser.username}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeclineRequest(request.id)}>
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Friends Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Friends</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-2">
          {friends.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No friends yet</h3>
                <p className="text-sm text-muted-foreground">Start connecting with people to build your network!</p>
              </CardContent>
            </Card>
          ) : (
            friends.map(friend => (
              <FriendCard 
                key={friend.id} 
                friend={friend} 
                onToggleFollow={handleToggleFollow}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="followers" className="space-y-2">
          {followers.map(follower => (
            <FriendCard 
              key={follower.id} 
              friend={follower} 
              onToggleFollow={handleToggleFollow}
            />
          ))}
        </TabsContent>

        <TabsContent value="following" className="space-y-2">
          {following.map(followed => (
            <FriendCard 
              key={followed.id} 
              friend={followed} 
              onToggleFollow={handleToggleFollow}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FriendCard({ friend, onToggleFollow }: { 
  friend: Friend; 
  onToggleFollow: (userId: string, isFollowing: boolean) => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={friend.avatar} />
            <AvatarFallback>{friend.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{friend.name}</div>
            <div className="text-sm text-muted-foreground">@{friend.username}</div>
            <div className="flex gap-2 mt-1">
              {friend.isMutual && <Badge variant="secondary"><UserCheck className="h-3 w-3 mr-1" />Mutual</Badge>}
              {friend.isFollower && <Badge variant="outline">Follows you</Badge>}
            </div>
          </div>
        </div>
        <Button
          variant={friend.isFollowing ? "outline" : "default"}
          size="sm"
          onClick={() => onToggleFollow(friend.id, friend.isFollowing)}
        >
          {friend.isFollowing ? (
            <>
              <UserMinus className="h-4 w-4 mr-2" />
              Unfollow
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Follow
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
