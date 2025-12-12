import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { StarRating } from "./StarRating";

export const UserDashboard: React.FC = () => {
  const {
    stores,
    getStoreAverageRating,
    getStoreRatingCount,
    getUserRatingForStore,
    submitRating,
    updateUserProfile,
    currentUser: user,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPassword, setEditPassword] = useState("");

  // Filter store search
  const filteredStores = stores.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update profile handler
  const handleSaveProfile = () => {
    if (!user) return;

    updateUserProfile({
      id: user.id,
      name: editName,
      password: editPassword || undefined,
    });

    setIsEditing(false); // Close edit mode
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">

      {/* USER PROFILE */}
      <div className="bg-white px-4 py-5 border rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Your Profile</h3>

          {/* EDIT BUTTON */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="mt-3 text-sm">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <div className="space-y-4 mt-4">

            {/* NAME INPUT */}
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white px-4 py-5 border rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Store Listings</h3>
        <p className="text-gray-500 text-sm mt-1">
          Browse stores and share your experiences.
        </p>

        <input
          type="text"
          placeholder="Search store by name..."
          className="mt-3 w-full px-3 py-2 border rounded-lg text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* STORE LIST */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((store) => {
          const avgRating = getStoreAverageRating(store.id);
          const ratingCount = getStoreRatingCount(store.id);
          const userRating = getUserRatingForStore(store.id);

          return (
            <div
              key={store.id}
              className="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">

                {/* Store header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 truncate">
                      {store.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{store.address}</p>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {avgRating} / 5
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      ({ratingCount} ratings)
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {store.description}
                </p>

                {/* Rating section */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-medium text-gray-700">
                      {userRating ? "Your Rating:" : "Rate this store:"}
                    </span>

                    <div className="flex justify-between items-center">
                      <StarRating
                        rating={userRating || 0}
                        interactive={true}
                        onRatingChange={(val) => submitRating(store.id, val)}
                        size="lg"
                      />

                      {userRating && (
                        <span className="text-xs text-green-600 font-semibold animate-pulse">
                          Saved
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
