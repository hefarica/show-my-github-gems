import { create } from 'zustand';
import { Opportunity } from '../types';

interface OpportunitiesState {
  opportunities: Opportunity[];
  addOpportunity: (opportunity: Opportunity) => void;
  removeOpportunity: (id: string) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  clearOpportunities: () => void;
}

export const useOpportunitiesStore = create<OpportunitiesState>((set) => ({
  opportunities: [],
  
  addOpportunity: (opportunity: Opportunity) => set((state) => ({
    opportunities: [...state.opportunities, opportunity]
  })),
  
  removeOpportunity: (id: string) => set((state) => ({
    opportunities: state.opportunities.filter(opp => opp.id !== id)
  })),
  
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => set((state) => ({
    opportunities: state.opportunities.map(opp => 
      opp.id === id ? { ...opp, ...updates } : opp
    )
  })),
  
  clearOpportunities: () => set({ opportunities: [] })
}));

export default useOpportunitiesStore;
