import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://sertifikat-backend.onrender.com/api/auth';

const useAuthStore = create((set) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isLoading: false,
  error: null,
  
  login: async (username, password) => {  // Changed email to username
    try {
      set({ isLoading: true, error: null });
      
      const { data } = await axios.post(`${API_URL}/login`, { username, password });  // Changed email to username
      
      localStorage.setItem('user', JSON.stringify(data));
      
      set({ user: data, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        isLoading: false 
      });
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
  
  register: async (username, password) => {  // Changed name and email to just username
    try {
      set({ isLoading: true, error: null });
      
      const { data } = await axios.post(`${API_URL}/register`, { username, password });  // Changed parameters
      
      localStorage.setItem('user', JSON.stringify(data));
      
      set({ user: data, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        isLoading: false 
      });
      return false;
    }
  }
}));

export default useAuthStore;