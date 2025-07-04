import { create } from 'zustand';

const useOfferStore = create((set, get) => ({
  // State
  offers: [],
  sentOffers: [],
  receivedOffers: [],
  pendingOffers: [],
  acceptedOffers: [],
  rejectedOffers: [],
  currentOffer: null,
  isLoading: false,
  error: null,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  setOffers: (offers) => {
    const sent = offers.filter(o => o.type === 'sent');
    const received = offers.filter(o => o.type === 'received');
    const pending = offers.filter(o => o.status === 'pending');
    const accepted = offers.filter(o => o.status === 'accepted');
    const rejected = offers.filter(o => o.status === 'rejected');
    
    set({
      offers,
      sentOffers: sent,
      receivedOffers: received,
      pendingOffers: pending,
      acceptedOffers: accepted,
      rejectedOffers: rejected,
    });
  },
  
  addOffer: (offer) => {
    set((state) => {
      const newOffers = [...state.offers, offer];
      const sent = newOffers.filter(o => o.type === 'sent');
      const received = newOffers.filter(o => o.type === 'received');
      const pending = newOffers.filter(o => o.status === 'pending');
      const accepted = newOffers.filter(o => o.status === 'accepted');
      const rejected = newOffers.filter(o => o.status === 'rejected');
      
      return {
        offers: newOffers,
        sentOffers: sent,
        receivedOffers: received,
        pendingOffers: pending,
        acceptedOffers: accepted,
        rejectedOffers: rejected,
      };
    });
  },
  
  updateOffer: (offerId, updates) => {
    set((state) => {
      const updatedOffers = state.offers.map(offer =>
        offer.id === offerId ? { ...offer, ...updates } : offer
      );
      
      const sent = updatedOffers.filter(o => o.type === 'sent');
      const received = updatedOffers.filter(o => o.type === 'received');
      const pending = updatedOffers.filter(o => o.status === 'pending');
      const accepted = updatedOffers.filter(o => o.status === 'accepted');
      const rejected = updatedOffers.filter(o => o.status === 'rejected');
      
      return {
        offers: updatedOffers,
        sentOffers: sent,
        receivedOffers: received,
        pendingOffers: pending,
        acceptedOffers: accepted,
        rejectedOffers: rejected,
        currentOffer: state.currentOffer?.id === offerId
          ? { ...state.currentOffer, ...updates }
          : state.currentOffer,
      };
    });
  },
  
  respondToOffer: (offerId, response, message = '') => {
    const { updateOffer } = get();
    updateOffer(offerId, {
      status: response,
      responseMessage: message,
      respondedAt: new Date().toISOString(),
    });
  },
  
  setCurrentOffer: (offer) => set({ currentOffer: offer }),
  
  clearOffers: () => set({
    offers: [],
    sentOffers: [],
    receivedOffers: [],
    pendingOffers: [],
    acceptedOffers: [],
    rejectedOffers: [],
    currentOffer: null,
  }),
  
  getOfferById: (id) => {
    const { offers } = get();
    return offers.find(offer => offer.id === id);
  },
}));

export default useOfferStore; 