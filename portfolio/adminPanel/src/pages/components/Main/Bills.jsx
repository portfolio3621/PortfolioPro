import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaFileInvoice,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaEye,
  FaEdit,
  FaTrash,
  FaShieldAlt,
  FaTimes,
  FaSync,
  FaChartBar
} from 'react-icons/fa';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URI;

const API_URL = `${BACKEND_URL}/bill`;

const BillManagement = () => {
  // States
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Form data
  const [newBill, setNewBill] = useState({
    portfolioId: '',
    userId: '',
    status: 'UnClaim'
  });
  
  const [recoverToken, setRecoverToken] = useState('');
  
  // Fetch bills on component mount
  useEffect(() => {
    fetchBills();
  }, []);
  
  // API Functions
  const fetchBills = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setBills(response.data.data || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bills');
    } finally {
      setLoading(false);
    }
  };
  
  const createBill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(API_URL, newBill);
      setBills([response.data.data, ...bills]);
      setSuccess('Bill created successfully!');
      setShowCreateModal(false);
      setNewBill({ portfolioId: '', userId: '', status: 'UnClaim' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create bill');
    } finally {
      setLoading(false);
    }
  };
  
  const updateBill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${selectedBill._id}`, selectedBill);
      setBills(bills.map(bill => bill._id === selectedBill._id ? response.data.data : bill));
      setSuccess('Bill updated successfully!');
      setShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update bill');
    } finally {
      setLoading(false);
    }
  };
  
  const deleteBill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bill?')) return;
    
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBills(bills.filter(bill => bill._id !== id));
      setSuccess('Bill deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete bill');
    } finally {
      setLoading(false);
    }
  };
  
  const recoverBill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/recover`, { token: recoverToken });
      setSelectedBill(response.data.data);
      setShowRecoverModal(false);
      setShowViewModal(true);
      setSuccess('Bill recovered successfully!');
      setRecoverToken('');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid token or bill not found');
    } finally {
      setLoading(false);
    }
  };
  
  // Helper functions
  const getStatusBadge = (status) => {
    const styles = {
      Claim: 'bg-green-100 text-green-800 border-green-200',
      UnClaim: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Trial: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    const icons = {
      Claim: FaCheckCircle,
      UnClaim: FaClock,
      Trial: FaExclamationCircle
    };
    
    const Icon = icons[status];
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
        <Icon className="w-4 h-4 mr-1" />
        {status}
      </span>
    );
  };
  
  // Filter bills
  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.token?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.portfolioId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.userId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Stats
  const stats = {
    total: bills.length,
    claimed: bills.filter(b => b.status === 'Claim').length,
    unclaimed: bills.filter(b => b.status === 'UnClaim').length,
    trial: bills.filter(b => b.status === 'Trial').length
  };
  
  // Modal Components
  const CreateModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Create New Bill</h3>
          <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={createBill} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio ID *</label>
              <input
                type="text"
                required
                value={newBill.portfolioId}
                onChange={(e) => setNewBill({...newBill, portfolioId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter portfolio ID"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User ID *</label>
              <input
                type="text"
                required
                value={newBill.userId}
                onChange={(e) => setNewBill({...newBill, userId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter user ID"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                value={newBill.status}
                onChange={(e) => setNewBill({...newBill, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="UnClaim">UnClaim</option>
                <option value="Claim">Claim</option>
                <option value="Trial">Trial</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Bill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  const RecoverModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center p-6 border-b">
          <FaShieldAlt className="w-8 h-8 text-yellow-500 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Recover Bill</h3>
          <button onClick={() => setShowRecoverModal(false)} className="ml-auto text-gray-400 hover:text-gray-600">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={recoverBill} className="p-6">
          <p className="text-gray-600 mb-6">Enter the token to recover a lost bill.</p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Token *</label>
            <input
              type="text"
              required
              value={recoverToken}
              onChange={(e) => setRecoverToken(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition font-mono"
              placeholder="Enter 40-character token"
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => setShowRecoverModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition disabled:opacity-50"
            >
              {loading ? 'Recovering...' : 'Recover Bill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  const ViewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Bill Details</h3>
          <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        
        {selectedBill && (
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Status</span>
                {getStatusBadge(selectedBill.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Token</span>
                  <p className="font-mono text-sm mt-1 break-all">{selectedBill.token}</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Portfolio ID</span>
                  <p className="font-semibold mt-1">{selectedBill.portfolioId}</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">User ID</span>
                  <p className="font-semibold mt-1">{selectedBill.userId}</p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-gray-600">Created At</span>
                  <p className="font-semibold mt-1">
                    {new Date(selectedBill.createdAt).toLocaleDateString()} {new Date(selectedBill.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              {selectedBill.unclaimedAt && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-600">Unclaimed At</span>
                  <p className="font-semibold mt-1">
                    {new Date(selectedBill.unclaimedAt).toLocaleDateString()} {new Date(selectedBill.unclaimedAt).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setShowEditModal(true);
                }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition"
              >
                Edit Bill
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  const EditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Edit Bill</h3>
          <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        
        {selectedBill && (
          <form onSubmit={updateBill} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token</label>
                <input
                  type="text"
                  value={selectedBill.token}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg font-mono text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio ID</label>
                <input
                  type="text"
                  value={selectedBill.portfolioId}
                  onChange={(e) => setSelectedBill({...selectedBill, portfolioId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedBill.status}
                  onChange={(e) => setSelectedBill({...selectedBill, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="UnClaim">UnClaim</option>
                  <option value="Claim">Claim</option>
                  <option value="Trial">Trial</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unclaimed At</label>
                <input
                  type="datetime-local"
                  value={selectedBill.unclaimedAt ? new Date(selectedBill.unclaimedAt).toISOString().slice(0, 16) : ''}
                  onChange={(e) => setSelectedBill({...selectedBill, unclaimedAt: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Bill'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bill Management</h1>
            <p className="text-gray-600 mt-1">Manage all your bills in one place</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowRecoverModal(true)}
              className="flex items-center px-4 py-2 border border-yellow-300 text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaShieldAlt className="w-5 h-5 mr-2" />
              Recover Bill
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition"
            >
              <FaPlus className="w-5 h-5 mr-2" />
              New Bill
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center">
              <FaFileInvoice className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-blue-700">Total Bills</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
            <div className="flex items-center">
              <FaCheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-green-700">Claimed</p>
                <p className="text-2xl font-bold text-green-900">{stats.claimed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center">
              <FaClock className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-yellow-700">Unclaimed</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.unclaimed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center">
              <FaExclamationCircle className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-purple-700">Trial</p>
                <p className="text-2xl font-bold text-purple-900">{stats.trial}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center">
            <FaExclamationCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
          <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center">
            <FaCheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <p className="text-green-700">{success}</p>
          </div>
          <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bills by token, portfolio, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <FaFilter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="all">All Status</option>
              <option value="Claim">Claim</option>
              <option value="UnClaim">UnClaim</option>
              <option value="Trial">Trial</option>
            </select>
            
            <button
              onClick={fetchBills}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 flex items-center"
            >
              <FaSync className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>
      
      {/* Bills Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && bills.length === 0 ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                ))
              ) : filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <FaFileInvoice className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No bills found. Create your first bill!</p>
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-gray-800 bg-gray-100 px-3 py-1 rounded inline-block">
                        {bill.token?.substring(0, 10)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{bill.portfolioId}</td>
                    <td className="px-6 py-4 text-gray-700">{bill.userId}</td>
                    <td className="px-6 py-4">{getStatusBadge(bill.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(bill.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBill(bill);
                            setShowViewModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View"
                        >
                          <FaEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBill(bill);
                            setShowEditModal(true);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteBill(bill._id)}
                          disabled={loading}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          title="Delete"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Info */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredBills.length}</span> of <span className="font-medium">{bills.length}</span> bills
          </div>
          <div className="text-sm text-gray-500">
            {filteredBills.length > 0 && (
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {showCreateModal && <CreateModal />}
      {showRecoverModal && <RecoverModal />}
      {showViewModal && <ViewModal />}
      {showEditModal && <EditModal />}
    </div>
  );
};

export default BillManagement;