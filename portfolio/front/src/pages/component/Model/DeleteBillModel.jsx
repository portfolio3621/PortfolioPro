// components/DeleteModal.jsx
import React, { useState } from "react";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

const REQUIRED_TEXT = "Delete my Portfolio";

const DeleteModal = ({ isOpen, onClose, onConfirm, bill }) => {
  const [confirmText, setConfirmText] = useState("");

  if (!isOpen) return null;

  const isConfirmed = confirmText === REQUIRED_TEXT;

  const handleConfirm = () => {
    if (!isConfirmed) return;
    onConfirm();
    setConfirmText("");
  };

  const handleClose = () => {
    setConfirmText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div
          className="relative w-full max-w-md mx-auto overflow-hidden
          rounded-lg sm:rounded-2xl bg-white dark:bg-gray-800
          p-4 sm:p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 sm:right-4 sm:top-4
            p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20
              bg-gradient-to-br from-red-100 to-red-50
              dark:from-red-900/30 dark:to-red-900/10
              rounded-full flex items-center justify-center mb-5
              ring-4 sm:ring-8 ring-red-50 dark:ring-red-900/10">
              <FiAlertTriangle className="text-red-500 text-3xl" />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Delete Portfolio
            </h3>

            <p className="text-xs sm:text-sm font-semibold text-red-500 tracking-wider mt-1 mb-4">
              THIS ACTION CANNOT BE UNDONE
            </p>

            {/* Bill Info */}
            {bill && (
              <div className="mb-6 bg-gray-50 dark:bg-gray-900/50
                rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Portfolio Name
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {bill.name}
                </p>
              </div>
            )}

            {/* Warning */}
            <div className="mb-6 p-4 rounded-xl border
              border-red-200 dark:border-red-800
              bg-gradient-to-r from-red-50 to-orange-50
              dark:from-red-900/10 dark:to-orange-900/10
              text-left">
              <h4 className="text-sm font-bold text-red-700 dark:text-red-300 mb-1">
                Irreversible Action
              </h4>
              <p className="text-sm text-red-600 dark:text-red-400">
                This will permanently delete{" "}
                <span className="font-semibold">
                  {bill ? `"${bill.name}"` : "this portfolio"}
                </span>{" "}
                and all associated data.
              </p>
            </div>

            {/* Confirmation Input */}
            <div className="mb-6 text-left">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Type <span className="text-red-500">{REQUIRED_TEXT}</span> to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={REQUIRED_TEXT}
                className={`w-full px-4 py-2.5 rounded-xl border
                  bg-white dark:bg-gray-900
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2
                  ${
                    confirmText && !isConfirmed
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 dark:border-gray-700 focus:ring-red-500"
                  }`}
              />

              {confirmText && !isConfirmed && (
                <p className="mt-1 text-xs text-red-500">
                  Text does not match exactly.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 rounded-xl
              bg-gray-100 dark:bg-gray-700
              text-gray-800 dark:text-gray-200
              hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              disabled={!isConfirmed}
              onClick={handleConfirm}
              className={`flex-1 px-6 py-3 rounded-xl
                flex items-center justify-center gap-2
                transition-all
                ${
                  isConfirmed
                    ? "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/25 active:scale-95"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
            >
              <FiTrash2 className="w-5 h-5" />
              Delete Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;