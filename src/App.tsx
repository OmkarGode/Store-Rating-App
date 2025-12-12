import React from 'react';
import { useApp } from './contexts/AppContext';
import { Login } from './components/Login';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { OwnerDashboard } from './components/OwnerDashboard';
import { UserRole } from './types';

const App: React.FC = () => {
  const { currentUser, logout } = useApp();

  if (!currentUser) {
    return <Login />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case UserRole.USER:
        return <UserDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.OWNER:
        return <OwnerDashboard />;
      default:
        return <div>Unknown Role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Persistent Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded bg-indigo-600 flex items-center justify-center mr-2">
                   <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                   </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-800">RateMyStore</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                <span className="text-xs text-gray-500 uppercase">{currentUser.role}</span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm transition-all"
              >
                Logout
              </button>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default App;
