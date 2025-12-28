// components/BillDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiArrowLeft, FiTrash2, FiEdit, 
  FiCheckCircle, FiXCircle, FiCopy,
  FiDollarSign, FiTag, FiCalendar, FiFileText,
  FiAlertCircle, FiExternalLink
} from 'react-icons/fi';
import StatusUpdateModal from './Model/StatusUpdateBillModel';
import DeleteModal from './Model/DeleteBillModel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Fetch from "../../Fetch.js";

const BillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100,
    });
    fetchBillDetails();
  }, [id]);

  const fetchBillDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await Fetch.get(`get-data-of-bills/${id}`);
      if (response.success && response.data?.[0]) {
        setBill(response.data[0]);
      } else {
        setError('Bill not found or data is missing');
      }
    } catch (err) {
      setError('Failed to fetch bill details. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      if (!bill?.id) {
        setError('Bill ID is missing');
        return;
      }
      
      const response = await Fetch.put(`bill/${bill.id}/${newStatus}`);
      if (response.success) {
        setBill({ ...bill, status: newStatus });
        setSuccessMessage(`Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError('Failed to update status. Please try again.');
      console.log('Status update error:', err);
    } finally {
      fetchBillDetails()
      setShowStatusModal(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await Fetch.deleteData(`bill/${id}`);
      if (response.success) {
        navigate('/dashboard', { 
          state: { 
            message: 'Bill deleted successfully',
            type: 'success'
          }
        });
      } else {
        setError('Failed to delete bill');
      }
    } catch (err) {
      setError('Failed to delete bill. Please try again.');
      console.log('Delete error:', err);
    }
  };

  const copyToClipboard = (text) => {
    if (!text) {
      setError('No text to copy');
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => {
        setSuccessMessage('Copied to clipboard!');
        setTimeout(() => setSuccessMessage(''), 2000);
      })
      .catch(err => {
        console.error('Copy error:', err);
        setError('Failed to copy to clipboard');
      });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (err) {
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'claim': return {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-700',
        icon: FiCheckCircle
      };
      case 'unclaim': return {
        bg: 'bg-rose-50 dark:bg-rose-900/20',
        text: 'text-rose-700 dark:text-rose-300',
        border: 'border-rose-200 dark:border-rose-700',
        icon: FiXCircle
      };
      default: return {
        bg: 'bg-gray-50 dark:bg-gray-800',
        text: 'text-gray-700 dark:text-gray-300',
        border: 'border-gray-200 dark:border-gray-700',
        icon: FiAlertCircle
      };
    }
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '$0.00';
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numAmount);
  };

  // Loading State
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center" data-aos="fade-in">
          <div className="inline-block animate-spin rounded-full h-14 w-14 sm:h-16 sm:w-16 border-t-3 border-b-3 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-base sm:text-lg font-medium">
            Loading bill details...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !bill) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center max-w-sm sm:max-w-md" data-aos="fade-up">
          <div className="mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/20 dark:to-rose-900/10 rounded-full flex items-center justify-center">
              <FiFileText className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 dark:text-rose-400" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Bill Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base lg:text-lg">
            {error || "The bill you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg sm:rounded-xl transition-all duration-200 font-medium text-sm sm:text-base"
            >
              <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Go Back
            </button>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl transition-all duration-200 font-medium text-sm sm:text-base"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusColor(bill.status);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50" data-aos="fade-down">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl shadow-lg animate-fade-in flex items-center gap-2 max-w-xs sm:max-w-sm">
            <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base truncate">{successMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8" data-aos="fade-down">
          {/* Top Row - Back & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Back Button */}
            <div className="flex-1 min-w-0">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-2 sm:gap-3 group w-fit"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center group-hover:border-blue-500 dark:group-hover:border-blue-500 transition-all duration-200 shadow-sm flex-shrink-0">
                  <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Back to</p>
                  <p className="text-sm sm:text-base font-bold text-gray-800 dark:text-white truncate">Dashboard</p>
                </div>
              </Link>
            </div>
            
            {/* Status & Action Buttons */}
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              {/* Status Badge */}
              <div className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border ${statusStyle.border} ${statusStyle.bg} flex-shrink-0`}>
                <StatusIcon className={`${statusStyle.text} w-4 h-4 sm:w-5 sm:h-5`} />
                <span className={`font-semibold capitalize text-sm sm:text-base ${statusStyle.text}`}>
                  {bill.status || 'Unknown'}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-sm text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base flex-1 min-w-0"
                >
                  <FiEdit className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">Update Status</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-sm font-medium text-sm sm:text-base flex-1 min-w-0"
                >
                  <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">Delete Bill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Page Title */}
          <div className="mt-2 sm:mt-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 break-words">
              {bill.name || 'Untitled Bill'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
              Bill ID: <span className="font-mono text-gray-800 dark:text-gray-300">{bill.id}</span>
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
          {/* Left Column - Bill Details (2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Bill Overview Card */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              data-aos="fade-right"
            >
              <div className="p-4 sm:p-5 lg:p-6 xl:p-8">
                {/* Amount Display */}
                <div className="mb-4 sm:mb-6 lg:mb-8 text-center">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-1 sm:mb-2">Total Amount</p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-600 dark:text-blue-400 break-all">
                    {formatCurrency(bill.price)}
                  </p>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                  {/* Bill ID */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2">
                        <FiCopy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Bill ID</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(bill.id)}
                        className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 flex items-center gap-1"
                      >
                        <FiCopy className="w-2 h-2 sm:w-3 sm:h-3" />
                        Copy
                      </button>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-3 overflow-hidden">
                      <p className="font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-300 break-all overflow-x-auto">
                        {bill.id}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  {bill.category && (
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700 flex-shrink-0">
                          <FiTag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                          <p className="font-semibold text-gray-800 dark:text-white truncate">{bill.category}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Created Date */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Created</p>
                        <p className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm">
                          {formatDate(bill.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Token */}
                  {bill.token && (
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex items-center gap-2">
                          <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">TOKEN</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(bill.token)}
                          className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 flex items-center gap-1"
                        >
                          <FiCopy className="w-2 h-2 sm:w-3 sm:h-3" />
                          Copy
                        </button>
                      </div>
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-3 overflow-hidden">
                        <p className="font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-300 break-all overflow-x-auto">
                          {bill.token}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Actions (1/3 on desktop) */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Bill Preview */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              data-aos="fade-left"
            >
              <div className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                    Bill Preview
                  </h3>
                </div>
                <div className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="aspect-square relative">
                    <img
                      src={bill.thumbnail || `https://ui-avatars.com/api/?name=${encodeURIComponent(bill.name || 'Bill')}&background=3b82f6&color=fff&size=300`}
                      alt={bill.name || 'Bill'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(bill.name || 'Bill')}&background=3b82f6&color=fff&size=300`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div className="p-3 sm:p-4 lg:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={() => setShowStatusModal(true)}
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg sm:rounded-xl transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Update Status</span>
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(bill.id)}
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    <FiCopy className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Copy Bill ID</span>
                  </button>

                  {bill.token && (
                    <button
                      onClick={() => copyToClipboard(bill.token)}
                      className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 font-medium text-sm sm:text-base"
                    >
                      <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Copy Token</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Status Info */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="p-3 sm:p-4 lg:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Status Information
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Current Status</span>
                    <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg ${statusStyle.bg} ${statusStyle.border}`}>
                      <StatusIcon className={`${statusStyle.text} w-3 h-3 sm:w-4 sm:h-4`} />
                      <span className={`font-medium capitalize text-xs sm:text-sm ${statusStyle.text}`}>
                        {bill.status || 'Unknown'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Amount</span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(bill.price)}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 block mb-1">Created</span>
                    <span className="text-gray-900 dark:text-white text-xs sm:text-sm">
                      {formatDate(bill.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <StatusUpdateModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={handleStatusUpdate}
        bill={bill}
        currentStatus={bill.status}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        bill={bill}
      />
    </div>
  );
};

export default BillDetailPage;