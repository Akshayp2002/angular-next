'use client';

import React, { useState } from 'react';
import { FiCheck, FiX, FiStar } from 'react-icons/fi';

interface TestimonyFormProps {
  onSuccess?: () => void;
}

export default function TestimonyForm({ onSuccess }: TestimonyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    review: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', position: '', company: '', review: '', rating: 5 });
        setTimeout(() => setStatus('idle'), 5000);
        onSuccess?.();
      } else {
        throw new Error(result.error || 'Failed to submit review');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-5 bg-white dark:bg-[#0D1117] rounded-4xl border border-gray-200 dark:border-gray-700 ring-2 ring-transparent dark:ring-gray-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Leave a Testimony</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your feedback is greatly appreciated.</p>
      </div>

      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
          <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-3 border border-green-500/20">
            <FiCheck size={28} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Thank You!</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Submitted for review.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-5 px-5 py-2 text-sm font-semibold bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-full transition-all border border-gray-200 dark:border-white/10"
          >
            Submit another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 ml-2 uppercase tracking-tight">Full Name *</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#111821] border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 ml-2 uppercase tracking-tight">Position</label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Engineer"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#111821] border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 ml-2 uppercase tracking-tight">Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Google"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#111821] border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 ml-2 uppercase tracking-tight">Rating</label>
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-[#111821] border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className={`${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700'} transition-colors hover:scale-110`}
                >
                  <FiStar fill={formData.rating >= star ? 'currentColor' : 'none'} size={18} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 ml-2 uppercase tracking-tight">Review *</label>
            <textarea
              required
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows={3}
              placeholder="Your experience..."
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#111821] border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none text-sm"
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center space-x-2 text-red-500 text-[12px] bg-red-500/5 p-3 rounded-xl border border-red-500/10">
              <FiX className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-[#FF0080] to-[#FF8C00] dark:from-[#8983F7] dark:to-[#A3DAFB] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            {isSubmitting ? (
              <span className="flex items-center justify-center text-sm">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : <span className="text-sm">Send Testimony</span>}
          </button>
        </form>
      )}
    </div>
  );
}
