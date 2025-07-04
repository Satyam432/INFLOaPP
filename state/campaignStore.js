import { create } from 'zustand';

const useCampaignStore = create((set, get) => ({
  // State
  campaigns: [],
  activeCampaigns: [],
  draftCampaigns: [],
  currentCampaign: null,
  isLoading: false,
  error: null,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  setCampaigns: (campaigns) => {
    const active = campaigns.filter(c => c.status === 'active');
    const draft = campaigns.filter(c => c.status === 'draft');
    
    set({
      campaigns,
      activeCampaigns: active,
      draftCampaigns: draft,
    });
  },
  
  addCampaign: (campaign) => {
    set((state) => {
      const newCampaigns = [...state.campaigns, campaign];
      const active = newCampaigns.filter(c => c.status === 'active');
      const draft = newCampaigns.filter(c => c.status === 'draft');
      
      return {
        campaigns: newCampaigns,
        activeCampaigns: active,
        draftCampaigns: draft,
      };
    });
  },
  
  updateCampaign: (campaignId, updates) => {
    set((state) => {
      const updatedCampaigns = state.campaigns.map(campaign =>
        campaign.id === campaignId ? { ...campaign, ...updates } : campaign
      );
      
      const active = updatedCampaigns.filter(c => c.status === 'active');
      const draft = updatedCampaigns.filter(c => c.status === 'draft');
      
      return {
        campaigns: updatedCampaigns,
        activeCampaigns: active,
        draftCampaigns: draft,
        currentCampaign: state.currentCampaign?.id === campaignId
          ? { ...state.currentCampaign, ...updates }
          : state.currentCampaign,
      };
    });
  },
  
  setCurrentCampaign: (campaign) => set({ currentCampaign: campaign }),
  
  clearCampaigns: () => set({
    campaigns: [],
    activeCampaigns: [],
    draftCampaigns: [],
    currentCampaign: null,
  }),
  
  getCampaignById: (id) => {
    const { campaigns } = get();
    return campaigns.find(campaign => campaign.id === id);
  },
}));

export default useCampaignStore; 