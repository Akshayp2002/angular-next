import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Handle mounting and exact transition timing
    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            setTimeout(() => setIsVisible(true), 10);
            document.body.style.overflow = 'hidden';
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setIsRendered(false);
                setSubmitStatus('idle'); // reset on close
                setFormData({ name: '', email: '', message: '' });
            }, 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isRendered) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.error || 'Failed to send message');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-auto h-[100dvh]">
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Modal Dialog */}
            <div 
                className={`relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-4xl border border-gray-200 bg-[#f8fafc] p-6 sm:p-8 shadow-2xl dark:border-gray-700 dark:bg-[#0d1117] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 sm:top-6 sm:right-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-[#151f2b] transition-colors"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mb-6 mt-1">
                    <h3 className="text-[26px] font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                        Reach Out
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-300">
                        Drop me a message and I'll get back to you securely to your inbox.
                    </p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="py-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h4>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Thank you for reaching out. I'll respond shortly.</p>
                        <button 
                            onClick={onClose} 
                            className="mt-6 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition"
                        >
                            Close Window
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 bg-white dark:bg-[#111821] border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a352d1] transition-all font-medium text-sm shadow-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-white dark:bg-[#111821] border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a352d1] transition-all font-medium text-sm shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="message" className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 ml-1">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can I help you?"
                                className="w-full px-4 py-3 bg-white dark:bg-[#111821] border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a352d1] transition-all font-medium text-sm resize-none shadow-sm"
                            ></textarea>
                        </div>

                        {submitStatus === 'error' && (
                            <p className="text-red-500 text-sm ml-1 font-medium">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative group w-full mt-4 overflow-hidden rounded-[16px] font-semibold text-white py-4 transition-all hover:shadow-[0_8px_30px_rgba(111,94,245,0.4)] disabled:opacity-70 disabled:cursor-not-allowed border-none outline-none"
                        >
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#6f5ef5] to-[#ff6e40] transition-transform duration-500 ease-out z-0 group-hover:scale-[1.05]"></div>
                            
                            {/* Hover Brightness */}
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>

                            <span className="relative z-20 flex items-center justify-center tracking-wide text-white drop-shadow-sm">
                                {isSubmitting ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    "Send Message"
                                )}
                            </span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );

    if (typeof document === 'undefined') return null;
    return createPortal(modalContent, document.body);
}
