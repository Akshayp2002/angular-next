'use client';

import React, { useEffect, useState } from 'react';
import TestimonyCard from './TestimonyCard';
import { Review } from '@/lib/supabase/reviews';

export default function TestimonyList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error: unknown) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-white/5 rounded-3xl" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10">
        <p className="text-white/50 text-sm font-medium uppercase tracking-widest">No testimonies yet</p>
        <p className="text-gray-400 mt-2">Be the first to leave one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review, index) => (
        <div key={review.id || index} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
          <TestimonyCard 
            name={review.name}
            position={review.position}
            company={review.company}
            review={review.review}
            rating={review.rating}
            avatar={review.avatar}
          />
        </div>
      ))}
    </div>
  );
}
