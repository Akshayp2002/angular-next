/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FiStar } from 'react-icons/fi';

interface TestimonyCardProps {
  name: string;
  position?: string;
  company?: string;
  review: string;
  rating: number;
  avatar: string;
}

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const GlowContainer = styled.div`
  position: relative;
  padding: 1px;
  background: transparent;
  overflow: hidden;
  border-radius: 2.5rem;
  height: 100%;
  display: flex;
`;

const GlowBorder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 120deg,
    #eff8ffff 150deg,
    #c6dfffff 180deg,
    transparent 210deg,
    transparent 360deg
  );
  animation: ${spin} 4s linear infinite;
  z-index: 0;
  filter: none;
`;

export default function TestimonyCard({ name, position, company, review, rating, avatar }: TestimonyCardProps) {
  return (
    <GlowContainer>
      <GlowBorder className="glow-border" />
      <div className="group relative z-10 p-5 bg-white dark:bg-[#0D1117] rounded-[calc(2.5rem-1px)] border border-gray-200 dark:border-gray-700 transition-all hover:translate-y--1 shadow-md hover:shadow-xl flex flex-col flex-1 overflow-hidden">
        {/* Content remains the same */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-800">
            <img 
              src={avatar} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
              }}
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight truncate">{name}</h4>
            {(position || company) && (
              <p className="text-[10px] text-gray-500 dark:text-gray-500 font-bold uppercase tracking-wider truncate">
                {position || company}
              </p>
            )}
          </div>
        </div>

        <div className="flex mb-3 space-x-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar 
              key={star} 
              size={12} 
              className={star <= rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-800'} 
              fill={star <= rating ? 'currentColor' : 'none'} 
            />
          ))}
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic flex-grow">
          "{review}"
        </p>
      </div>
    </GlowContainer>
  );
}
