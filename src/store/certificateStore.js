import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://sertifikat-backend.onrender.com/api/certificates';

const useCertificateStore = create((set, get) => ({
  certificates: [],
  certificate: null,
  isLoading: false,
  error: null,
  
  // Get auth config with token
  getConfig: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
  },
  
  // Create a certificate
  createCertificate: async (certificateData) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data } = await axios.post(
        API_URL, 
        certificateData, 
        get().getConfig()
      );
      
      set((state) => ({ 
        certificates: [data, ...state.certificates],
        certificate: data,
        isLoading: false 
      }));
      
      return data;
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        isLoading: false 
      });
      return null;
    }
  },
  
  // Get all certificates
  getCertificates: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data } = await axios.get(API_URL, get().getConfig());
      
      set({ certificates: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        isLoading: false 
      });
    }
  },
  
  // Get certificate by ID
  getCertificateById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data } = await axios.get(`${API_URL}/${id}`, get().getConfig());
      
      set({ certificate: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        isLoading: false 
      });
    }
  },
  
  // Verify certificate by barcode
  verifyCertificate: async (barcode) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data } = await axios.get(`${API_URL}/verify/${barcode}`);
      
      set({ certificate: data.certificateData, isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        isLoading: false 
      });
      return { isValid: false };
    }
  },
  
  // Update certificate
  updateCertificate: async (id, certificateData) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data } = await axios.put(
        `${API_URL}/${id}`,
        certificateData,
        get().getConfig()
      );
      
      set((state) => ({
        certificates: state.certificates.map(cert => 
          cert._id === id ? data : cert
        ),
        certificate: data,
        isLoading: false
      }));
      
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
  
  // Delete certificate
  deleteCertificate: async (id) => {
    try {
      set({ isLoading: true, error: null });
      
      await axios.delete(`${API_URL}/${id}`, get().getConfig());
      
      set((state) => ({
        certificates: state.certificates.filter(cert => cert._id !== id),
        isLoading: false
      }));
      
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
  
  // Clear errors
  clearError: () => set({ error: null })
}));

export default useCertificateStore;