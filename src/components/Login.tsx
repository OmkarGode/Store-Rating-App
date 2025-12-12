import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const { login, signup } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  // Validation State
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};
    
    // Email Validation (Standard)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Password Validation
    // 8-16 characters, at least one uppercase, at least one special character
    if (password.length < 8 || password.length > 16) {
      errors.password = "Password must be between 8 and 16 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one special character.";
    }

    if (!isLogin) {
      // Signup Specific Validations
      
      // Name: Min 20, Max 60 characters
      if (name.length < 20) {
        errors.name = "Name must be at least 20 characters long.";
      } else if (name.length > 60) {
        errors.name = "Name must be no more than 60 characters long.";
      }

      // Address: Max 400 characters
      if (address.length > 400) {
        errors.address = "Address must be no more than 400 characters long.";
      }
      if (address.trim().length === 0) {
         errors.address = "Address is required.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const success = await login(email, password, role);
        if (!success) {
          setError('Invalid credentials or role mismatch.');
        }
      } else {
        const success = await signup({
          name,
          email,
          password,
          address,
          role,
        });
        if (!success) {
          setError('Email already exists. Please login.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFieldErrors({});
    // Reset fields optional, keeping for user convenience when switching back and forth
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Sign in to access your dashboard' : 'Join RateMyStore today'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Account Type</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { r: UserRole.USER, label: 'User' },
                { r: UserRole.OWNER, label: 'Owner' },
                { r: UserRole.ADMIN, label: 'Admin' }
              ].map((option) => (
                <button
                  key={option.r}
                  type="button"
                  onClick={() => setRole(option.r)}
                  className={`
                    flex items-center justify-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none transition-colors
                    ${role === option.r 
                      ? 'bg-indigo-600 text-white border-transparent shadow-sm' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    className={`appearance-none block w-full px-3 py-2 border ${fieldErrors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Min 20 characters"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
                </div>
              </div>
            )}

             {!isLogin && (
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <div className="mt-1">
                  <textarea
                    id="address"
                    name="address"
                    required={!isLogin}
                    rows={3}
                    className={`appearance-none block w-full px-3 py-2 border ${fieldErrors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Max 400 characters"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                   <div className="flex justify-between mt-1">
                      {fieldErrors.address ? (
                        <p className="text-xs text-red-600">{fieldErrors.address}</p>
                      ) : <span></span>}
                      <span className={`text-xs ${address.length > 400 ? 'text-red-600' : 'text-gray-400'}`}>
                        {address.length}/400
                      </span>
                   </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${fieldErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
              </div>
            </div>

           
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${fieldErrors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="8-16 chars, 1 Upper, 1 Special"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <button
                type="button"
                onClick={switchMode}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
};