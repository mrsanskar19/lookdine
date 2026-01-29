import { api } from './api';

export interface Friend {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  isFollowing: boolean;
  isFollower: boolean;
  isMutual: boolean;
  createdAt: string;
}

export interface FollowRequest {
  id: string;
  fromUser: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
}

export const friendsService = {
  // Get user's friends list
  getFriends: async () => {
    const res = await api.get<{ data: Friend[] }>('/friends');
    return res?.data;
  },

  // Get followers
  getFollowers: async () => {
    const res = await api.get<{ data: Friend[] }>('/friends/followers');
    return res?.data;
  },

  // Get following
  getFollowing: async () => {
    const res = await api.get<{ data: Friend[] }>('/friends/following');
    return res?.data;
  },

  // Follow/unfollow user
  toggleFollow: async (userId: string) => {
    const res = await api.post<{ data: { isFollowing: boolean } }>(`/friends/follow/${userId}`, {});
    return res?.data;
  },

  // Get follow requests
  getFollowRequests: async () => {
    const res = await api.get<{ data: FollowRequest[] }>('/friends/requests');
    return res?.data;
  },

  // Accept follow request
  acceptFollowRequest: async (requestId: string) => {
    const res = await api.post(`/friends/requests/${requestId}/accept`, {});
    return res?.data;
  },

  // Decline follow request
  declineFollowRequest: async (requestId: string) => {
    const res = await api.post(`/friends/requests/${requestId}/decline`, {});
    return res?.data;
  },

  // Get friends count stats
  getFriendsStats: async () => {
    const res = await api.get<{ data: { followers: number; following: number; mutual: number } }>('/friends/stats');
    return res?.data;
  }
};
