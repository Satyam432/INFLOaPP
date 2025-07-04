import { mockCampaigns, mockCreatorsForDiscovery } from './mockData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const campaignService = {
  // Create new campaign
  createCampaign: async (campaignData) => {
    await delay(1200);
    
    const newCampaign = {
      id: 'cmp_' + Date.now(),
      ...campaignData,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    
    return {
      success: true,
      message: 'Campaign created successfully',
      data: newCampaign
    };
  },

  // Get campaigns by brand
  getCampaignsByBrand: async (brandId) => {
    await delay(800);
    
    const campaigns = mockCampaigns.filter(campaign => campaign.brandId === brandId);
    
    return {
      success: true,
      data: campaigns
    };
  },

  // Get campaign by ID
  getCampaignById: async (campaignId) => {
    await delay(500);
    
    const campaign = mockCampaigns.find(c => c.id === campaignId);
    
    if (campaign) {
      return {
        success: true,
        data: campaign
      };
    } else {
      return {
        success: false,
        message: 'Campaign not found',
        error: 'CAMPAIGN_NOT_FOUND'
      };
    }
  },

  // Update campaign
  updateCampaign: async (campaignId, updates) => {
    await delay(800);
    
    return {
      success: true,
      message: 'Campaign updated successfully',
      data: {
        id: campaignId,
        ...updates,
        updatedAt: new Date().toISOString()
      }
    };
  },

  // Delete campaign
  deleteCampaign: async (campaignId) => {
    await delay(600);
    
    return {
      success: true,
      message: 'Campaign deleted successfully'
    };
  },

  // Publish campaign
  publishCampaign: async (campaignId) => {
    await delay(700);
    
    return {
      success: true,
      message: 'Campaign published successfully',
      data: {
        id: campaignId,
        status: 'active',
        publishedAt: new Date().toISOString()
      }
    };
  },

  // Get active campaigns for creators to view
  getActiveCampaigns: async (filters = {}) => {
    await delay(600);
    
    let campaigns = mockCampaigns.filter(c => c.status === 'active');
    
    // Apply filters
    if (filters.niche) {
      campaigns = campaigns.filter(c => c.niche === filters.niche);
    }
    
    if (filters.budgetMin) {
      campaigns = campaigns.filter(c => c.budget >= filters.budgetMin);
    }
    
    if (filters.budgetMax) {
      campaigns = campaigns.filter(c => c.budget <= filters.budgetMax);
    }
    
    return {
      success: true,
      data: campaigns
    };
  },

  // Search creators for brand discovery
  searchCreators: async (filters = {}) => {
    await delay(800);
    
    let creators = [...mockCreatorsForDiscovery];
    
    // Apply filters
    if (filters.niche) {
      creators = creators.filter(c => c.niche === filters.niche);
    }
    
    if (filters.minFollowers) {
      creators = creators.filter(c => c.followers >= filters.minFollowers);
    }
    
    if (filters.maxFollowers) {
      creators = creators.filter(c => c.followers <= filters.maxFollowers);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      creators = creators.filter(c => 
        c.name.toLowerCase().includes(searchTerm) ||
        c.bio.toLowerCase().includes(searchTerm) ||
        c.niche.toLowerCase().includes(searchTerm)
      );
    }
    
    return {
      success: true,
      data: creators
    };
  }
}; 