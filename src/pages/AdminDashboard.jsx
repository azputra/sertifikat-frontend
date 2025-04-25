// DashboardPage.js - Updated Code

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCertificateStore from '../store/certificateStore';
import Modal from '../components/Modal';
import axios from 'axios';

const API_URL = 'https://sertifikat-backend.onrender.com/api/certificates';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { certificates, getCertificates, deleteCertificate, createCertificate, updateCertificate, isLoading, error } = useCertificateStore();
  const navigate = useNavigate();
  
  const [downloadingId, setDownloadingId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState(null);
  const [formData, setFormData] = useState({
    programName: '',
    issueDate: '',
    endUserName: '',
    endUserId: '',
    address: '',
    component: '',
    licenseNumber: '', // Moved after component
    skuNumber: '',
    quantity: 1,
    isValid: true
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [isLoadingButton, setIsLoadingButton] = useState(false);
  
  // Helper function to check if user is admin
  const isAdmin = user?.isAdmin;
  
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    
    getCertificates();
  }, [user, navigate, getCertificates]);
  
  // Get current certificates for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCertificates = certificates.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate total pages
  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleDelete = (certificate) => {
    setCertificateToDelete(certificate);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = async () => {
    if (certificateToDelete) {
      await deleteCertificate(certificateToDelete);
      setShowDeleteModal(false);
      setCertificateToDelete(null);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleView = (certificate) => {
    setCurrentCertificate(certificate);
    setShowViewModal(true);
  };
  
  const handleEdit = (certificate) => {
    setCurrentCertificate(certificate);
    setFormData({
      programName: certificate.programName,
      issueDate: new Date(certificate.issueDate).toISOString().split('T')[0],
      endUserName: certificate.endUserName,
      endUserId: certificate.endUserId,
      address: certificate.address,
      component: certificate.component,
      licenseNumber: certificate.licenseNumber,
      skuNumber: certificate.skuNumber,
      quantity: certificate.quantity,
      isValid: certificate.isValid
    });
    setShowEditModal(true);
  };
  
  const handleCreate = () => {
    setFormData({
      programName: '',
      issueDate: new Date().toISOString().split('T')[0],
      endUserName: '',
      endUserId: '',
      address: '',
      component: '',
      licenseNumber: '',
      skuNumber: '',
      quantity: 1,
      isValid: true
    });
    setShowCreateModal(true);
  };
  
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true)
    try {
      await createCertificate(formData);
      setShowCreateModal(false);
      setIsLoadingButton(false)
    } catch (error) {
      setIsLoadingButton(false)
      console.error('Error creating certificate:', error);
    }
  };
  
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true)
    try {
      await updateCertificate(currentCertificate._id, formData);
      setShowEditModal(false);
      setIsLoadingButton(false)
    } catch (error) {
      setIsLoadingButton(false)
      console.error('Error updating certificate:', error);
    }
  };

  const handleDownload = async (certificate) => {
    if (!certificate) return;
    
    try {
      setDownloadingId(certificate._id);
      
      const response = await axios.post(`${API_URL}/generate-pdf`, {
        certificateData: certificate,
        barcode: certificate.barcode
      }, {
        responseType: 'blob'
      });
      
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `SECUONE_AIOT_Certificate_${certificate.licenseNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(pdfUrl);
      document.body.removeChild(a);
      
      setDownloadingId(null);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setDownloadingId(null);
      alert('Failed to generate certificate PDF. Please try again.');
    }
  };
  
  // Function to truncate long text with ellipsis
  const truncateText = (text, maxLength = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background network graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-contain bg-no-repeat bg-right-bottom"
           style={{ backgroundImage: 'url(/network-graphic.svg)' }}>
      </div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-[#5FAD41] mb-1">SECUONE</h1>
            <p className="text-[#335C81] text-sm">TAKE SECURITY SERIOUSLY</p>
            <h2 className="text-2xl font-semibold text-[#4472C4] mt-2">Certificate Dashboard</h2>
            {/* Display user role */}
            <p className="text-sm text-gray-600 mt-1">
              Logged in as: {user?.username} ({isAdmin ? 'Admin' : 'Supervisor'})
            </p>
          </div>
          {/* Only show create button for admin users */}
          {isAdmin && (
            <button
              onClick={handleCreate}
              className="bg-[#5FAD41] text-white px-6 py-3 rounded-md hover:bg-[#4c8a34] transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Certificate
            </button>
          )}
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5FAD41] mx-auto mb-4"></div>
            <p className="text-[#4472C4] font-medium">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-700 mb-4">No certificates found.</p>
            {isAdmin && (
              <button
                onClick={handleCreate}
                className="bg-[#5FAD41] text-white px-5 py-2 rounded-md hover:bg-[#4c8a34] transition inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create your first certificate
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-[#4472C4] text-white">
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      License Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      End User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      SKU Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCertificates.map((certificate) => (
                    <tr key={certificate._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {certificate.licenseNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.endUserName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500" title={certificate.programName}>
                        {truncateText(certificate.programName, 25)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(certificate.issueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.skuNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          certificate.isValid 
                            ? 'bg-[#e8f5e9] text-[#2e7d32]' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {certificate.isValid ? 'Valid' : 'Invalid'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex space-x-2 justify-center">
                          <button
                            onClick={() => handleDownload(certificate)}
                            disabled={downloadingId === certificate._id}
                            className={`${
                              downloadingId === certificate._id 
                                ? 'bg-gray-400' 
                                : 'bg-[#4472C4] hover:bg-[#385da2]'
                            } text-white cursor-pointer p-2 rounded transition`}
                          >
                            {downloadingId === certificate._id ? 'Loading..' : 'Download'}
                          </button>
                          <button
                            onClick={() => handleView(certificate)}
                            className="bg-[#4472C4] hover:bg-[#385da2] text-white cursor-pointer p-2 rounded transition"
                          >
                            View
                          </button>
                          {/* Edit button for admin users */}
                          {isAdmin && (
                            <button
                              onClick={() => handleEdit(certificate)}
                              className="bg-[#5FAD41] hover:bg-[#4c8a34] text-white cursor-pointer p-2 rounded transition"
                            >
                              Edit
                            </button>
                          )}
                          {/* Delete button for supervisor users */}
                          {!isAdmin && (
                            <button
                              onClick={() => handleDelete(certificate._id)}
                              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer p-2 rounded transition"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-end items-center space-x-2 mt-6">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4472C4] text-white hover:bg-[#385da2]'}`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-[#5FAD41] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4472C4] text-white hover:bg-[#385da2]'}`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Decorative elements */}
        <div className="mt-8 flex justify-end space-x-2">
          <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
          <div className="w-16 h-3 bg-[#4472C4] rounded-full"></div>
          <div className="w-16 h-3 bg-[#5FAD41] rounded-full"></div>
        </div>
      </div>
      
      {/* Create Certificate Modal - only render if user is admin */}
      {isAdmin && showCreateModal && (
        <Modal title={
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Create New Certificate</h3>
          </div>
        } onClose={() => setShowCreateModal(false)}>
          <form onSubmit={handleSubmitCreate} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">Program Name</label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                required
              />
            </div>

            <div className='w-full'>
              <label className="block text-sm font-medium text-[#4472C4]">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                required
              />
            </div>
            
            <div className='flex gap-2'>
              <div className='w-full'>
                <label className="block text-sm font-medium text-[#4472C4]">Customer Name</label>
                <input
                  type="text"
                  name="endUserName"
                  value={formData.endUserName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                  required
                />
              </div>
              <div className='w-full'>
                <label className="block text-sm font-medium text-[#4472C4]">Customer ID</label>
                <input
                  type="text"
                  name="endUserId"
                  value={formData.endUserId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">Component Description</label>
              <input
                type="text"
                name="component"
                value={formData.component}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                required
              />
            </div>
            
            {/* License Number moved after Component Description */}
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                placeholder=""
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
              />
            </div>
            
            <div className='flex gap-2'>
              <div className='w-full'>
                <label className="block text-sm font-medium text-[#4472C4]">SKU Number</label>
                <input
                  type="text"
                  name="skuNumber"
                  value={formData.skuNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                  required
                />
              </div>
              
              <div className='w-full'>
                <label className="block text-sm font-medium text-[#4472C4]">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isValid"
                checked={formData.isValid}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#5FAD41] border-gray-300 rounded focus:ring-[#5FAD41]"
              />
              <label className="ml-2 block text-sm text-gray-700">Valid Certificate</label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${
                  isLoadingButton 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#5FAD41] hover:bg-[#4c8a34]'
                } text-white px-4 py-2 rounded-md transition flex items-center`}
                disabled={isLoadingButton}
              >
                {isLoadingButton ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Certificate'
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
      
      {/* Edit Certificate Modal - only render if user is admin */}
      {isAdmin && showEditModal && currentCertificate && (
        <Modal title={
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Edit Certificate</h3>
          </div>
        } onClose={() => setShowEditModal(false)}>
          <form onSubmit={handleSubmitEdit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">Program Name</label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                required
              />
            </div>
            
            <div className='flex gap-2'>
              <div className='w-full'>
                <label className="block text-sm font-medium text-[#4472C4]">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                  required
                />
              </div>
              
              <div className='w-full'>
                <label className="block text-sm font-medium text-[#4472C4]">Customer Name</label>
                <input
                  type="text"
                  name="endUserName"
                  value={formData.endUserName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">Customer ID</label>
              <input
                type="text"
                name="endUserId"
                value={formData.endUserId}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">Component Description</label>
              <input
                type="text"
                name="component"
                value={formData.component}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                required
              />
            </div>
            
            {/* License Number moved after Component Description */}
            <div>
              <label className="block text-sm font-medium text-[#4472C4]">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
              />
            </div>
            
            <div className='flex gap-2'>
              <div className='w-full'>
                <label className="block text-sm font-medium text-[#4472C4]">SKU Number</label>
                <input
                  type="text"
                  name="skuNumber"
                  value={formData.skuNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                  required
                />
              </div>
              
              <div className='w-full'>
                <label className="block text-sm font-medium text-[#4472C4]">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-[#5FAD41] focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isValid"
                checked={formData.isValid}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#5FAD41] border-gray-300 rounded focus:ring-[#5FAD41]"
              />
              <label className="ml-2 block text-sm text-gray-700">Valid Certificate</label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${
                  isLoadingButton 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#4472C4] hover:bg-[#385da2]'
                } text-white px-4 py-2 rounded-md transition flex items-center`}
                disabled={isLoadingButton}
              >
                {isLoadingButton ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Certificate'
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
      
      {/* View Certificate Modal */}
      {showViewModal && currentCertificate && (
        <Modal title={
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Certificate Detail</h3>
          </div>
        } onClose={() => setShowViewModal(false)}>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">License Number</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.licenseNumber}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Barcode</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.barcode}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Program Name</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.programName}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Issue Date</h3>
                <p className="mt-1 text-sm text-gray-900">{formatDate(currentCertificate.issueDate)}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Customer Name</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.endUserName}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Customer ID</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.endUserId}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Component Description</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.component}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">SKU Number</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.skuNumber}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Quantity</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.quantity}</p>
              </div>
              <div className="border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Status</h3>
                <p className="mt-1 text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    currentCertificate.isValid 
                      ? 'bg-[#e8f5e9] text-[#2e7d32]' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentCertificate.isValid ? 'Valid' : 'Invalid'}
                  </span>
                </p>
              </div>
              <div className="col-span-2 border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Address</h3>
                <p className="mt-1 text-sm text-gray-900">{currentCertificate.address}</p>
              </div>
              <div className="col-span-2 border-l-4 border-[#5FAD41] pl-3">
                <h3 className="text-sm font-medium text-[#4472C4]">Created At</h3>
                <p className="mt-1 text-sm text-gray-900">{formatDate(currentCertificate.createdAt)}</p>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end border-t mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="bg-[#4472C4] text-white px-5 py-2 rounded-md hover:bg-[#385da2] transition"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
      
      {/* Delete Confirmation Modal - only render if user is supervisor */}
      {!isAdmin && showDeleteModal && (
        <Modal title={
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Confirm Delete</h3>
          </div>
        } onClose={() => setShowDeleteModal(false)}>
          <div className="p-4">
            <div className="mb-6 text-center">
              <svg className="mx-auto mb-4 w-14 h-14 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Are you sure you want to delete this certificate?</h3>
              <p className="mt-2 text-sm text-gray-500">
                This will permanently remove the certificate "{certificateToDelete?.licenseNumber}". 
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4 pt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete Certificate
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;