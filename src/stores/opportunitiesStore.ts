import { create } from 'zustand';

interface Opportunity {
  id: number;
  chain: string;
  tokens: string[];
  profit: number;
}

interface OpportunitiesStore {
  opportunities: Opportunity[];
  addOpportunity: (opp: Opportunity) => void;
  removeOpportunity: (id: number) => void;
}

export const useOpportunitiesStore = create<OpportunitiesStore>((set) => ({
  opportunities: [],
  addOpportunity: (opp) => set((state) => ({ 
    opportunities: [...state.opportunities, opp] 
  })),
  removeOpportunity: (id) => set((state) => ({
    opportunities: state.opportunities.filter(o => o.id !== id)
  }))
}));
