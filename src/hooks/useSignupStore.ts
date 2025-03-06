import { create } from 'zustand';

interface SignupState {
  name: string;
  employeeId: string;
  password: string;
  setSignupData: (data: Partial<SignupState>) => void;
  resetSignupData: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  name: '',
  employeeId: '',
  password: '',
  setSignupData: (data) => set((state) => ({ ...state, ...data })),
  resetSignupData: () => set({ name: '', employeeId: '', password: '' })
}));
