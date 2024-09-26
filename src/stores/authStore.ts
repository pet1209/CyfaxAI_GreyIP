import * as zustandModule from 'zustand';  

const create = zustandModule.create;  

interface AuthState {  
  isLoggedOut: boolean;  
  setIsLoggedOut: (status: boolean) => void;  
}  

const useAuthStore = create<AuthState>((set) => ({  
  isLoggedOut: false,  
  setIsLoggedOut: (status) => set({ isLoggedOut: status }),  
}));  

export default useAuthStore;