import React from 'react';
import TestimonyForm from './TestimonyForm';
import TestimonyList from './TestimonyList';

export const metadata = {
  title: 'Testimonies | Akshay',
  description: 'Share your experience working with me.',
};

export default function TestimoniesPage() {
  return (
    <div className="min-h-screen bg-[#F7F2F2] dark:bg-[#090c10] relative overflow-hidden selection:bg-purple-500/30 transition-colors duration-300">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-400/10 dark:bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-400/10 dark:bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-6 md:py-1">
        {/* Top Header */}
        <div className="text-center mb-3 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-sm">
            <span className="text-[10px] font-bold text-gray-500 dark:text-purple-400 uppercase tracking-[0.2em]">
              Testimonies &bull; Feedback
            </span>
          </div>
          <p className="max-w-md mx-auto text-gray-500 dark:text-gray-400 text-sm md:text-base font-medium leading-relaxed">
            Sharing experiences and building connections through shared projects.
          </p>
        </div>

        {/* The Form Section */}
        <div className="mb-8 md:mb-12">
          <TestimonyForm />
        </div>

        {/* Testimonies Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-gray-200 dark:border-gray-800">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Other Feedback</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">What others think about our collaboration.</p>
            </div>
          </div>

          <TestimonyList />
        </div>
      </div>
    </div>
  );
}
