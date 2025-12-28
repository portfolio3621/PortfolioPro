// components/Model/StatusUpdateBillModel.jsx
import React, { useState, useEffect } from 'react';
import { FiEdit, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';

const STATUS_STYLES = {
  Claim: {
    border: 'border-emerald-500 dark:border-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: FiCheckCircle,
    label: 'Claim',
    desc: 'Bill has been successfully claimed'
  },
  UnClaim: {
    border: 'border-rose-500 dark:border-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-700 dark:text-rose-300',
    icon: FiXCircle,
    label: 'Unclaim',
    desc: 'Bill is not claimed or rejected'
  }
};

const StatusUpdateModal = ({ isOpen, onClose, onConfirm, bill, currentStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  useEffect(() => {
    setSelectedStatus(currentStatus?.toLowerCase());
  }, [currentStatus]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedStatus && selectedStatus !== currentStatus?.toLowerCase()) {
      onConfirm(selectedStatus);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div 
          className="relative w-full max-w-md mx-auto transform overflow-hidden rounded-lg sm:rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-2xl transition-all"
          data-aos="zoom-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
          </button>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 rounded-full flex items-center justify-center mb-4 ring-4 sm:ring-8 ring-blue-50 dark:ring-blue-900/10">
              <FiEdit className="text-blue-500 dark:text-blue-400 text-2xl sm:text-3xl" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              Update Status
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select new status for this bill
            </p>
          </div>

          {/* Bill Info */}
          {bill && (
            <div className="mb-6 sm:mb-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Bill Name
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {bill.name}
                  </p>
                </div>
                <div className="flex-1 sm:text-right">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Current Status
                  </p>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium capitalize ${currentStatus ? STATUS_STYLES[currentStatus.toLowerCase()]?.bg || 'bg-gray-100 dark:bg-gray-700' : ''} ${currentStatus ? STATUS_STYLES[currentStatus.toLowerCase()]?.text || 'text-gray-700 dark:text-gray-300' : ''}`}>
                    {currentStatus && STATUS_STYLES[currentStatus.toLowerCase()]?.icon && 
                      React.createElement(STATUS_STYLES[currentStatus.toLowerCase()].icon, { className: "w-4 h-4" })
                    }
                    <span>{currentStatus || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Options */}
          <div className="space-y-3 sm:space-y-4 mb-8">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
              Select New Status
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(STATUS_STYLES).map(([value, style]) => {
                const Icon = style.icon;
                const isActive = selectedStatus === value;
                const isCurrent = currentStatus?.toLowerCase() === value;

                return (
                  <label
                    key={value}
                    className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${isActive ? `${style.border} ${style.bg}` : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'} ${isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={value}
                      checked={isActive}
                      onChange={() => !isCurrent && setSelectedStatus(value)}
                      disabled={isCurrent}
                      className="sr-only"
                    />
                    
                    <div className="flex items-center w-full">
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${isActive ? `${style.border} bg-white dark:bg-gray-800` : 'border-gray-300 dark:border-gray-600'}`}>
                        {isActive && (
                          <div className={`w-2.5 h-2.5 rounded-full ${style.text.replace('text-', 'bg-')}`}></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <Icon className={`${style.text} text-xl`} />
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white capitalize block">
                              {style.label}
                            </span>
                            {isCurrent && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                (Current)
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {style.desc}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg sm:rounded-xl transition-all duration-200 active:scale-95 text-sm sm:text-base flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedStatus || selectedStatus === currentStatus?.toLowerCase()}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10 transition-all duration-200 active:scale-95 text-sm sm:text-base flex-1"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;