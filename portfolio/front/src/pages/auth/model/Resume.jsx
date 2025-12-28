import React, { useState, useRef, useEffect } from 'react';
import {
    HiOutlineDocumentText,
    HiOutlineX,
    HiOutlineCloudUpload,
    HiOutlineTrash,
    HiOutlineCheckCircle
} from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';
import {
    Upload,
    FileText,
    CheckCircle,
    AlertCircle,
    X,
    ChevronUp
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Fetch from '../../../Fetch';

const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

const ResumeUpload = ({ EditResumeModelShow, oldResumeUrl, refresh }) => {
    const [resumeFileName, setResumeFileName] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const resumeInputRef = useRef(null);
    const modalContentRef = useRef();

    const handleResumeChange = async e => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!validTypes.includes(file.type)) {
            setError('Please select a PDF or Word document (PDF, DOC, DOCX)');
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            setError('File size should be less than 5MB');
            return;
        }

        let interval;

        try {
            setIsUploading(true);
            setError('');
            setUploadProgress(10);

            // 🔥 Delete old resume safely
            if (oldResumeUrl?.includes('/resumes/')) {
                const oldPath = oldResumeUrl.split('/resumes/')[1];
                if (oldPath) {
                    await supabase.storage.from('resumes').remove([oldPath]);
                }
            }

            // 🔥 Upload new resume
            const fileExt = file.name.split('.').pop();
            const filePath = `Resume/resume-${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            setUploadProgress(60);

            // 🔥 Get public URL
            const { data } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath);

            const newResumeUrl = data.publicUrl;

            // 🔥 Send URL to backend
            const resBackend = await Fetch.put('update-user', {
                resumeUrl: newResumeUrl
            });

            if (!resBackend?.success) {
                throw new Error('Backend update failed');
            }

            setResumeFileName(file.name);
            setResumeUrl(newResumeUrl);

            // 🔥 Smooth finish animation
            interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setIsUploading(false);
                            refresh();
                            EditResumeModelShow(false);
                        }, 500);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 80);
        } catch (error) {
            console.error(error);
            setError('Resume upload failed. Please try again.');
            setIsUploading(false);
            clearInterval(interval);
        }
    };

    const removeResume = () => {
        setResumeFileName('');
        setResumeUrl('');
        setUploadProgress(0);
        if (resumeInputRef.current) resumeInputRef.current.value = '';
        setError('');
    };

    const handleUpdate = () => {
        if (resumeFileName && resumeUrl) {
            refresh();
            EditResumeModelShow(false);
        }
    };

    const scrollToTop = () => {
        if (modalContentRef.current) {
            modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === 'Escape') {
                EditResumeModelShow(false);
            }
        };

        const handleScroll = () => {
            if (modalContentRef.current) {
                const scrollTop = modalContentRef.current.scrollTop;
                setIsScrolled(scrollTop > 20);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        if (modalContentRef.current) {
            modalContentRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (modalContentRef.current) {
                modalContentRef.current.removeEventListener(
                    'scroll',
                    handleScroll
                );
            }
        };
    }, [EditResumeModelShow]);

    const triggerFileInput = () => {
        if (!isUploading) {
            resumeInputRef.current?.click();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-start md:items-center justify-center px-0 md:px-4 backdrop-blur-sm"
            onClick={e => {
                if (e.target === e.currentTarget) {
                    EditResumeModelShow(false);
                }
            }}
        >
            {/* Mobile backdrop with swipe down to close hint */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:hidden">
                <div className="w-12 h-1.5 bg-gray-400/50 dark:bg-gray-600/50 rounded-full"></div>
            </div>

            <div
                ref={modalContentRef}
                className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-xl md:rounded-3xl relative shadow-2xl border-0 md:border border-gray-100 dark:border-gray-800 overflow-y-auto"
            >
                {/* Sticky Header for Mobile */}
                <div
                    className={`sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
                        isScrolled ? 'py-3 shadow-sm' : 'py-4'
                    }`}
                >
                    <div className="px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                                        Upload Resume
                                    </h1>
                                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                                        Update your professional resume
                                    </p>
                                </div>
                            </div>

                            <button
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                                onClick={() => EditResumeModelShow(false)}
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
                        className="fixed bottom-6 right-6 z-30 p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 md:hidden"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp className="w-5 h-5" />
                    </button>
                )}

                {/* Content */}
                <div className="p-4 md:p-8 space-y-6">
                    {/* Instructions */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 mb-4">
                            <FileText className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            Upload Your Resume
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Upload your latest resume to keep your profile
                            updated
                        </p>
                    </div>

                    {/* Upload Area */}
                    <div
                        onClick={triggerFileInput}
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                            isUploading
                                ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10'
                                : resumeFileName
                                ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/10'
                                : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600'
                        }`}
                    >
                        <input
                            ref={resumeInputRef}
                            type="file"
                            onChange={handleResumeChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            disabled={isUploading}
                        />

                        <div className="space-y-4">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                                {resumeFileName ? (
                                    <div className="relative">
                                        <FileText className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
                                        <div className="absolute -top-1 -right-1">
                                            <CheckCircle className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                                        </div>
                                    </div>
                                ) : isUploading ? (
                                    <div className="relative">
                                        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
                                        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <Upload className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
                                )}
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                                    {resumeFileName
                                        ? 'Resume Ready!'
                                        : isUploading
                                        ? 'Uploading Resume...'
                                        : 'Click to upload resume'}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    PDF, DOC, DOCX (Max 20MB)
                                </p>

                                {resumeFileName && !isUploading && (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                                        <CheckCircle className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {resumeFileName}
                                        </span>
                                    </div>
                                )}

                                {isUploading && (
                                    <div className="max-w-sm mx-auto space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-blue-600 dark:text-blue-400">
                                                Uploading...
                                            </span>
                                            <span className="font-medium text-blue-700 dark:text-blue-300">
                                                {uploadProgress}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                                                style={{
                                                    width: `${uploadProgress}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* File Actions */}
                    {resumeFileName && !isUploading && (
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => window.open(resumeUrl, '_blank')}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium"
                            >
                                <FileText className="w-5 h-5" />
                                Preview Resume
                            </button>
                            <button
                                onClick={removeResume}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 font-medium"
                            >
                                <HiOutlineTrash className="w-5 h-5" />
                                Remove
                            </button>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Requirements */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Resume Requirements:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                    <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">
                                        ✓
                                    </span>
                                </div>
                                <span>Supported formats: PDF, DOC, DOCX</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                    <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">
                                        ✓
                                    </span>
                                </div>
                                <span>Maximum file size: 20MB</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                    <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">
                                        ✓
                                    </span>
                                </div>
                                <span>
                                    Make sure your contact info is up to date
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                    <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">
                                        ✓
                                    </span>
                                </div>
                                <span>
                                    File will be securely stored and encrypted
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Current Resume Info */}
                    {oldResumeUrl && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Current Resume
                            </h4>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                    {oldResumeUrl.split('/').pop()}
                                </p>
                                <a
                                    href={oldResumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                >
                                    View
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sticky Footer for Mobile */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 md:p-8">
                    <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Your resume will be securely stored and
                                encrypted
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => EditResumeModelShow(false)}
                                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium flex-1 sm:flex-none"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <X className="w-4 h-4" />
                                    Cancel
                                </span>
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={!resumeFileName || isUploading}
                                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg flex-1 sm:flex-none ${
                                    resumeFileName && !isUploading
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white hover:shadow-xl'
                                        : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isUploading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Update Resume
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
};

export default ResumeUpload;
