import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import BinanceLogo from '../../components/UI/BinanceLogo';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BinanceLogo className="h-12 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-yellow-500 hover:text-yellow-400">
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-900/50 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-700 rounded bg-gray-700"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-yellow-500 hover:text-yellow-400">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-yellow-500 hover:text-yellow-400">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;