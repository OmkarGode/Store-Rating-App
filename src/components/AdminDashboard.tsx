import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { UserRole } from '../types';
import { StarRating } from './StarRating';

export const AdminDashboard: React.FC = () => {
  const { users, stores, ratings, getStoreAverageRating, addUser, removeUser, removeStore } = useApp();
  const [activeTab, setActiveTab] = useState<'stores' | 'users'>('stores');

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: UserRole.USER as UserRole,
    storeName: "",
    storeAddress: ""
  });

  const stats = [
    { name: 'Total Users', value: users.length, color: 'bg-blue-500' },
    { name: 'Total Stores', value: stores.length, color: 'bg-emerald-500' },
    { name: 'Total Ratings', value: ratings.length, color: 'bg-purple-500' },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.password) {
      setFormError("Name, Email and Password are required.");
      return;
    }
    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    if (users.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
      setFormError("Email already exists.");
      return;
    }

    if (formData.role === UserRole.OWNER && (!formData.storeName || !formData.storeAddress)) {
      setFormError("Owner must have a store name and address.");
      return;
    }

   
    addUser(formData);

    setShowAddUserModal(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: UserRole.USER,
      storeName: "",
      storeAddress: ""
    });
  };

  const getStoreOwnerName = (storeId: string) => {
    const owner = users.find(u => u.role === UserRole.OWNER && u.ownedStoreId === storeId);
    return owner ? owner.name : "No Owner Assigned";
  };

  const getUserStoreName = (storeId?: string) => {
    if (!storeId) return "-";
    const store = stores.find(s => s.id === storeId);
    return store ? store.name : "-";
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map(stat => (
          <div key={stat.name} className="bg-white shadow rounded-lg p-6">
            <dt className="text-sm text-gray-500">{stat.name}</dt>
            <dd className="text-3xl font-bold flex items-center mt-2">
              <span className={`w-3 h-3 rounded-full mr-2 ${stat.color}`} />
              {stat.value}
            </dd>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b flex">
          <button onClick={() => setActiveTab('stores')} className={`w-1/2 py-3 text-sm font-medium border-b-2 ${activeTab === "stores" ? "border-indigo-600 text-indigo-600" : "text-gray-600"}`}>Store Management</button>
          <button onClick={() => setActiveTab('users')} className={`w-1/2 py-3 text-sm font-medium border-b-2 ${activeTab === "users" ? "border-indigo-600 text-indigo-600" : "text-gray-600"}`}>User Management</button>
        </div>

        {/* Store Tab */}
        {activeTab === "stores" && (
          <div className="p-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Address</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Owner</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {stores.map(store => (
                  <tr key={store.id}>
                    <td className="px-6 py-3">{store.name}</td>
                    <td className="px-6 py-3">{store.address}</td>
                    <td className="px-6 py-3 italic">{getStoreOwnerName(store.id)}</td>
                    <td className="px-6 py-3 flex items-center">
                      <span className="mr-2">{getStoreAverageRating(store.id)}</span>
                      <StarRating rating={getStoreAverageRating(store.id)} size="sm" />
                    </td>
                    <td className="px-6 py-3">
                      <button onClick={() => removeStore(store.id)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* User Tab */}
        {activeTab === "users" && (
          <div className="p-6 overflow-x-auto">
            <button onClick={() => setShowAddUserModal(true)} className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">+ Add New User</button>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Store</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{user.role}</td>
                    <td className="px-6 py-3">{getUserStoreName(user.ownedStoreId)}</td>
                    <td className="px-6 py-3">
                      <button onClick={() => removeUser(user.id)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Create New User</h3>
            {formError && <p className="text-red-600 mb-3">{formError}</p>}

            <form onSubmit={handleAddUser} className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <input type="password" name="password" placeholder="Minimum 8 characters" value={formData.password} onChange={handleInputChange} className="w-full p-2 border rounded" />
              

              <select name="role" value={formData.role} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value={UserRole.USER}>User</option>
                <option value={UserRole.OWNER}>Owner</option>
                <option value={UserRole.ADMIN}>Admin</option>
              </select>

              {/* Store inputs only for new Owner */}
              {formData.role === UserRole.OWNER && (
                <>
                  <input type="text" name="storeName" placeholder="Store Name" value={formData.storeName} onChange={handleInputChange} className="w-full p-2 border rounded" />
                  <input type="text" name="storeAddress" placeholder="Store Address" value={formData.storeAddress} onChange={handleInputChange} className="w-full p-2 border rounded" />
                </>
              )}

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddUserModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
