// Mock Users
export const mockUsers = {
  creator1: {
    userId: 'usr_creator_1',
    role: 'creator',
    email: 'john.creator@example.com',
    name: 'John Creator',
    bio: 'Lifestyle content creator with 50K followers on Instagram',
    niche: 'lifestyle',
    followers: 50000,
    profileImage: 'https://picsum.photos/200/200?random=1',
    socialAccounts: {
      instagram: '@johncreator',
      tiktok: '@johnc_lifestyle',
      youtube: 'John Creator'
    },
    portfolio: [
      {
        id: 'proj_1',
        title: 'Fashion Campaign 2023',
        description: 'Winter collection showcase',
        images: ['https://picsum.photos/400/300?random=10'],
        metrics: { views: 25000, engagement: '4.2%' }
      }
    ]
  },
  creator2: {
    userId: 'usr_creator_2',
    role: 'creator',
    email: 'sarah.creator@example.com',
    name: 'Sarah Creator',
    bio: 'Food and travel content creator',
    niche: 'food',
    followers: 75000,
    profileImage: 'https://picsum.photos/200/200?random=2',
    socialAccounts: {
      instagram: '@sarahfoodie',
      tiktok: '@sarahcooks'
    }
  },
  brand1: {
    userId: 'usr_brand_1',
    role: 'brand',
    email: 'marketing@fashionbrand.com',
    name: 'Fashion Brand Co.',
    description: 'Premium fashion and lifestyle brand',
    industry: 'fashion',
    logo: 'https://picsum.photos/200/200?random=3'
  }
};

// Mock Campaigns
export const mockCampaigns = [
  {
    id: 'cmp_1',
    brandId: 'usr_brand_1',
    title: 'Spring Collection Launch',
    description: 'Promote our new spring collection with authentic lifestyle content',
    budget: 5000,
    deadline: '2024-03-15',
    requirements: ['Instagram post', 'Story mentions', 'Minimum 10K followers'],
    niche: 'lifestyle',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    images: ['https://picsum.photos/400/300?random=20']
  },
  {
    id: 'cmp_2',
    brandId: 'usr_brand_1',
    title: 'Summer Food Festival',
    description: 'Create content around our summer food festival',
    budget: 3000,
    deadline: '2024-06-01',
    requirements: ['TikTok video', 'Instagram reel'],
    niche: 'food',
    status: 'draft',
    createdAt: '2024-01-20T14:30:00Z'
  }
];

// Mock Offers
export const mockOffers = [
  {
    id: 'offer_1',
    campaignId: 'cmp_1',
    brandId: 'usr_brand_1',
    creatorId: 'usr_creator_1',
    amount: 1500,
    message: 'We love your lifestyle content and would like to collaborate!',
    requirements: ['2 Instagram posts', '5 story mentions'],
    deadline: '2024-03-10',
    status: 'pending',
    createdAt: '2024-01-22T09:15:00Z',
    type: 'received'
  },
  {
    id: 'offer_2',
    campaignId: 'cmp_2',
    brandId: 'usr_brand_1',
    creatorId: 'usr_creator_2',
    amount: 800,
    message: 'Perfect fit for our food festival campaign!',
    requirements: ['1 TikTok video', '3 Instagram stories'],
    deadline: '2024-05-25',
    status: 'accepted',
    createdAt: '2024-01-25T16:45:00Z',
    type: 'received'
  }
];

// Mock Chat Data
export const mockChats = {
  chat_1: {
    id: 'chat_1',
    campaignId: 'cmp_1',
    participants: ['usr_brand_1', 'usr_creator_1'],
    lastMessage: 'Can we schedule a call to discuss the details?',
    lastMessageTime: '2024-01-25T10:30:00Z',
    unreadCount: 2,
    isActive: true
  }
};

// Mock Messages
export const mockMessages = {
  chat_1: [
    {
      id: 'msg_1',
      chatId: 'chat_1',
      senderId: 'usr_brand_1',
      text: 'Hi John! We love your content and would like to collaborate.',
      timestamp: '2024-01-25T09:00:00Z'
    },
    {
      id: 'msg_2',
      chatId: 'chat_1',
      senderId: 'usr_creator_1',
      text: 'Thank you! I\'d be interested in learning more about the campaign.',
      timestamp: '2024-01-25T09:15:00Z'
    },
    {
      id: 'msg_3',
      chatId: 'chat_1',
      senderId: 'usr_brand_1',
      text: 'Can we schedule a call to discuss the details?',
      timestamp: '2024-01-25T10:30:00Z'
    }
  ]
};

// Mock Creators for Discovery
export const mockCreatorsForDiscovery = [
  {
    userId: 'usr_creator_1',
    name: 'John Creator',
    niche: 'lifestyle',
    followers: 50000,
    engagement: '4.2%',
    profileImage: 'https://picsum.photos/200/200?random=1',
    rate: '$500-1000',
    bio: 'Lifestyle content creator with authentic voice'
  },
  {
    userId: 'usr_creator_2',
    name: 'Sarah Creator',
    niche: 'food',
    followers: 75000,
    engagement: '5.1%',
    profileImage: 'https://picsum.photos/200/200?random=2',
    rate: '$800-1500',
    bio: 'Food and travel content creator'
  },
  {
    userId: 'usr_creator_3',
    name: 'Mike Fitness',
    niche: 'fitness',
    followers: 100000,
    engagement: '6.3%',
    profileImage: 'https://picsum.photos/200/200?random=4',
    rate: '$1000-2000',
    bio: 'Fitness coach and content creator'
  }
]; 