import React from 'react';
import { useApp } from '../contexts/AppContext';
import { StarRating } from './StarRating';

export const OwnerDashboard: React.FC = () => {
  const { currentUser, stores, ratings, users, getStoreAverageRating } = useApp();

  // Identify the store owned by the current user
  const myStore = stores.find(s => s.id === currentUser?.ownedStoreId);
  
  if (!myStore) {
    return (
      <div className="text-center py-20 bg-white shadow rounded-lg">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Store Assigned</h3>
        <p className="mt-1 text-sm text-gray-500">You are logged in as an Owner but have no store linked.</p>
      </div>
    );
  }

  const myRatings = ratings.filter(r => r.storeId === myStore.id);
  const avgRating = getStoreAverageRating(myStore.id);

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
           <h3 className="text-lg leading-6 font-medium text-gray-900">{myStore.name} Dashboard</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
           <div className="flex items-center justify-between">
             <div>
                <dt className="text-sm font-medium text-gray-500">Average Rating</dt>
                <dd className="mt-1 text-4xl font-extrabold text-indigo-600 flex items-center gap-2">
                  {avgRating} <span className="text-lg text-gray-400 font-normal">/ 5.0</span>
                </dd>
             </div>
             <div className="bg-yellow-50 p-4 rounded-full">
                <StarRating rating={avgRating} size="lg" />
             </div>
           </div>
        </div>
      </div>

      {/* Ratings List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Feedback</h3>
          <p className="mt-1 text-sm text-gray-500">List of users who have submitted ratings for your store.</p>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {myRatings.length === 0 ? (
            <li className="px-4 py-8 text-center text-gray-500">No ratings yet.</li>
          ) : (
            myRatings.map((rating) => {
              const rater = users.find(u => u.id === rating.userId);
              return (
                <li key={rating.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">
                          {rater?.name.charAt(0) || 'U'}
                       </div>
                       <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{rater?.name || 'Unknown User'}</div>
                          <div className="text-sm text-gray-500">{rater?.email || 'N/A'}</div>
                       </div>
                    </div>
                    <div className="flex flex-col items-end">
                       <StarRating rating={rating.value} size="sm" />
                       <span className="text-xs text-gray-400 mt-1">
                          {new Date(rating.timestamp).toLocaleDateString()}
                       </span>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};
