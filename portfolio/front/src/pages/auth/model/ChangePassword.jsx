import React, { useEffect, useState, useRef, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { Lock, Eye, EyeOff, Save, X, Shield, KeyRound, ChevronUp } from "lucide-react";
import Fetch from "../../../Fetch";

// Move PasswordInput outside and memoize it
const PasswordInput = React.memo(({ 
  label, 
  value, 
  onChange, 
  showPassword, 
  setShowPassword, 
  placeholder, 
  error 
}) => {
  const handleTogglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, [setShowPassword]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
        <KeyRound className="w-4 h-4" />
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`w-full border ${
            error ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700"
          } bg-white dark:bg-gray-800 rounded-xl p-4 pl-12 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-base`}
          placeholder={placeholder}
          autoComplete="off"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <Lock className="w-5 h-5" />
        </div>
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

function ChangePassword({ ChangePasswordModelShow }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const modalContentRef = useRef();

  // Use useCallback for stable event handlers
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      ChangePasswordModelShow(false);
    }
  }, [ChangePasswordModelShow]);

  const handleScroll = useCallback(() => {  
    if (modalContentRef.current) {  
      const scrollTop = modalContentRef.current.scrollTop;  
      setIsScrolled(scrollTop > 20);  
    }  
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    
    if (modalContentRef.current) {  
      modalContentRef.current.addEventListener('scroll', handleScroll);  
    }  
    
    return () => {  
      document.removeEventListener("keydown", handleKeyDown);  
      if (modalContentRef.current) {  
        modalContentRef.current.removeEventListener('scroll', handleScroll);  
      }  
    };
  }, [handleKeyDown, handleScroll]);

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (newPassword.length >= 6) strength += 25;
    if (/[A-Z]/.test(newPassword)) strength += 25;
    if (/[0-9]/.test(newPassword)) strength += 25;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 25;
    setPasswordStrength(strength);
  }, [newPassword]);

  const scrollToTop = useCallback(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError("Both old and new passwords are required");
      return;
    }

    if (newPassword.length < 6) {  
      setError("New password must be at least 6 characters long");  
      return;  
    }  

    if (newPassword !== confirmPassword) {  
      setError("New passwords do not match");  
      return;  
    }  

    setIsSubmitting(true);  
    setError("");  
    
    try {  
      const response = await Fetch.put(`changePassword`, {  
        oldPassword,  
        newPassword,  
      });  
      if (response.success === true) {  
        ChangePasswordModelShow(false);  
        alert("Password changed successfully!");  
      }  
    } catch (e) {  
      console.error(e.response?.data?.message || e.message);  
      setError(e.response?.data?.message || "Failed to change password");  
    } finally {  
      setIsSubmitting(false);  
    }
  };

  // Use useCallback for input change handlers
  const handleOldPasswordChange = useCallback((e) => {
    setOldPassword(e.target.value);
    setError("");
  }, []);

  const handleNewPasswordChange = useCallback((e) => {
    setNewPassword(e.target.value);
    setError("");
  }, []);

  const handleConfirmPasswordChange = useCallback((e) => {
    setConfirmPassword(e.target.value);
    setError("");
  }, []);

  const getPasswordStrengthColor = useCallback(() => {
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  }, [passwordStrength]);

  const getPasswordStrengthText = useCallback(() => {
    if (passwordStrength < 25) return "Very Weak";
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Fair";
    if (passwordStrength < 100) return "Good";
    return "Strong";
  }, [passwordStrength]);

  // Rest of your JSX remains the same...
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-start md:items-center justify-center px-0 md:px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          ChangePasswordModelShow(false);
        }
      }}
    >
      {/* Mobile backdrop with swipe down to close hint */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:hidden">
        <div className="w-12 h-1.5 bg-gray-400/50 dark:bg-gray-600/50 rounded-full"></div>
      </div>

      <div   
        ref={modalContentRef}  
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-3xl relative shadow-2xl border-0 md:border border-gray-100 dark:border-gray-800 overflow-y-auto"  
      >  
        {/* Sticky Header for Mobile */}  
        <div className={`sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${  
          isScrolled ? 'py-3 shadow-sm' : 'py-4'  
        }`}>  
          <div className="px-6">  
            <div className="flex items-center justify-between">  
              <div className="flex items-center gap-3">  
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500">  
                  <Shield className="w-5 h-5 text-white" />  
                </div>  
                <div>  
                  <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">  
                    Change Password  
                  </h1>  
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden md:block">  
                    Update your account security  
                  </p>  
                </div>  
              </div>  
                
              <button  
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"  
                onClick={() => ChangePasswordModelShow(false)}  
                aria-label="Close"  
              >  
                <IoIosClose className="text-2xl md:text-3xl text-gray-500 hover:text-red-500" />  
              </button>  
            </div>  
          </div>  
        </div>  

        {/* Scroll to top button */}  
        {isScrolled && (  
          <button  
            onClick={scrollToTop}  
            className="fixed bottom-6 right-6 z-30 p-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 md:hidden"  
            aria-label="Scroll to top"  
          >  
            <ChevronUp className="w-5 h-5" />  
          </button>  
        )}  

        {/* Content */}  
        <div className="p-4 md:p-8 space-y-6">  
          {/* Security Tips */}  
          <div className="p-4 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">  
            <div className="flex items-start gap-3">  
              <Shield className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5" />  
              <div>  
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">  
                  Password Requirements  
                </h3>  
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">  
                  <li className="flex items-center gap-1">• At least 6 characters long</li>  
                  <li className="flex items-center gap-1">• Include uppercase & lowercase letters</li>  
                  <li className="flex items-center gap-1">• Include numbers for better security</li>  
                  <li className="flex items-center gap-1">• Use special characters when possible</li>  
                </ul>  
              </div>  
            </div>  
          </div>  

          {/* Password Inputs */}  
          <div className="space-y-6">  
            <PasswordInput  
              label="Current Password"  
              value={oldPassword}  
              onChange={handleOldPasswordChange}  
              showPassword={showOldPassword}  
              setShowPassword={setShowOldPassword}  
              placeholder="Enter your current password"  
              error={error === "old password is incorrect"}  
            />  

            <PasswordInput  
              label="New Password"  
              value={newPassword}  
              onChange={handleNewPasswordChange}  
              showPassword={showNewPassword}  
              setShowPassword={setShowNewPassword}  
              placeholder="Create a strong new password"  
              error={false}  
            />  

            {/* Password Strength Meter */}  
            {newPassword && (  
              <div className="space-y-2">  
                <div className="flex justify-between items-center text-sm">  
                  <span className="text-gray-700 dark:text-gray-300">Password Strength</span>  
                  <span className={`font-medium ${  
                    passwordStrength < 25 ? "text-red-500" :  
                    passwordStrength < 50 ? "text-orange-500" :  
                    passwordStrength < 75 ? "text-yellow-500" :  
                    "text-green-500"  
                  }`}>  
                    {getPasswordStrengthText()}  
                  </span>  
                </div>  
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">  
                  <div  
                    className={`h-2 ${getPasswordStrengthColor()} transition-all duration-500`}  
                    style={{ width: `${passwordStrength}%` }}  
                  ></div>  
                </div>  
              </div>  
            )}  

            <PasswordInput  
              label="Confirm New Password"  
              value={confirmPassword}  
              onChange={handleConfirmPasswordChange}  
              showPassword={showConfirmPassword}  
              setShowPassword={setShowConfirmPassword}  
              placeholder="Re-enter your new password"  
              error={error === "New passwords do not match" || (confirmPassword && newPassword !== confirmPassword)}  
            />  
          </div>  

          {/* Error Message */}  
          {error && (  
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">  
              <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">  
                <Shield className="w-4 h-4" />  
                {error}  
              </p>  
            </div>  
          )}  

          {/* Password Match Indicator */}  
          {newPassword && confirmPassword && (  
            <div className={`p-4 rounded-xl border ${  
              newPassword === confirmPassword  
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"  
                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"  
            }`}>  
              <p className={`text-sm flex items-center gap-2 ${  
                newPassword === confirmPassword  
                  ? "text-green-600 dark:text-green-400"  
                  : "text-red-600 dark:text-red-400"  
              }`}>  
                {newPassword === confirmPassword ? (  
                  <>  
                    <span className="text-green-500">✓</span>  
                    Passwords match  
                  </>  
                ) : (  
                  <>  
                    <span className="text-red-500">✗</span>  
                    Passwords do not match  
                  </>  
                )}  
              </p>  
            </div>  
          )}  
        </div>  

        {/* Sticky Footer for Mobile */}  
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 md:p-8">  
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">  
            <div className="text-center md:text-left">  
              <p className="text-xs text-gray-600 dark:text-gray-400">  
                Make sure to use a strong, unique password  
              </p>  
            </div>  
              
            <div className="flex flex-col sm:flex-row gap-3">  
              <button  
                onClick={() => ChangePasswordModelShow(false)}  
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium flex-1 sm:flex-none"  
              >  
                <span className="flex items-center justify-center gap-2">  
                  <X className="w-4 h-4" />  
                  Cancel  
                </span>  
              </button>  
              <button  
                onClick={handleChangePassword}  
                disabled={isSubmitting || !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}  
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"  
              >  
                <span className="flex items-center justify-center gap-2">  
                  {isSubmitting ? (  
                    <>  
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>  
                      Updating...  
                    </>  
                  ) : (  
                    <>  
                      <Save className="w-4 h-4" />  
                      Update Password  
                    </>  
                  )}  
                </span>  
              </button>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>
  );
}

export default ChangePassword;