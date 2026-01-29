import { api } from './api';

export interface Story {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  media: string;
  mediaType: 'image' | 'video';
  createdAt: string;
  isViewed?: boolean;
  expiresAt: string;
  caption?: string;
  privacy: 'public' | 'friends' | 'private';
  settings: {
    allowComments: boolean;
    allowReactions: boolean;
    saveToProfile: boolean;
    autoDelete: boolean;
  };
}

export interface StorySettings {
  privacy: 'public' | 'friends' | 'private';
  allowComments: boolean;
  allowReactions: boolean;
  saveToProfile: boolean;
  autoDelete: boolean;
}

export const storiesService = {
  // Get all active stories
  getStories: async () => {
    const res = await api.get<{ data: Story[] }>('/stories');
    return res?.data;
  },

  // Get user's own stories
  getUserStories: async (userId?: string) => {
    const endpoint = userId ? `/stories/user/${userId}` : '/stories/my';
    const res = await api.get<{ data: Story[] }>(endpoint);
    return res?.data;
  },

  // Create new story
  createStory: async (data: {
    media: string;
    mediaType: 'image' | 'video';
    caption?: string;
    settings: StorySettings;
  }) => {
    const res = await api.post<{ data: Story }>('/stories', data, true);
    return res?.data;
  },

  // Upload story media
  uploadMedia: async (file: File) => {
    const formData = new FormData();
    formData.append('media', file);
    
    const res = await api.upload<{ data: { url: string; type: 'image' | 'video' } }>('/stories/upload', formData);
    return res?.data;
  },

  // Mark story as viewed
  viewStory: async (storyId: string) => {
    const res = await api.post(`/stories/${storyId}/view`, {});
    return res?.data;
  },

  // Delete story
  deleteStory: async (storyId: string) => {
    const res = await api.delete(`/stories/${storyId}`);
    return res?.data;
  },

  // Update story settings
  updateStorySettings: async (storyId: string, settings: Partial<StorySettings>) => {
    const res = await api.put(`/stories/${storyId}/settings`, settings);
    return res?.data;
  },

  // Get story viewers
  getStoryViewers: async (storyId: string) => {
    const res = await api.get<{ data: Array<{ user: any; viewedAt: string }> }>(`/stories/${storyId}/viewers`);
    return res?.data;
  },

  // Add reaction to story
  addReaction: async (storyId: string, type: 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry') => {
    const res = await api.post(`/stories/${storyId}/reactions`, { type });
    return res?.data;
  },

  // Add comment to story
  addComment: async (storyId: string, text: string) => {
    const res = await api.post(`/stories/${storyId}/comments`, { text });
    return res?.data;
  }
};
