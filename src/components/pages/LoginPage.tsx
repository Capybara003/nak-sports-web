import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../services/api';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      AuthService.login(credentials),
    onSuccess: () => {
      onLogin();
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const recoverPasswordMutation = useMutation({
    mutationFn: (email: string) => AuthService.recoverPassword(email),
    onSuccess: () => {
      alert('Password recovery email sent!');
      setIsRecovering(false);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      loginMutation.mutate({ email, password });
    }
  };

  const handleRecoverPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      recoverPasswordMutation.mutate(email);
    }
  };

  if (isRecovering) {
    return (
      <div className="min-h-screen bg-light-grey flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-h1 text-dark font-oswald mb-2">Recover Password</h1>
            <p className="text-body text-dark-grey">Enter your email to receive a recovery link</p>
          </div>

          <form onSubmit={handleRecoverPassword} className="space-y-4">
            <div>
              <label htmlFor="recover-email" className="block text-body text-dark font-medium mb-2">
                Email Address
              </label>
              <input
                id="recover-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={recoverPasswordMutation.isPending}
              className="btn-primary w-full"
            >
              {recoverPasswordMutation.isPending ? 'Sending...' : 'Send Recovery Email'}
            </button>

            <button
              type="button"
              onClick={() => setIsRecovering(false)}
              className="w-full text-body text-primary font-medium hover:underline"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-grey flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">NAK</span>
          </div>
          <h1 className="text-h1 text-dark font-oswald mb-2">Welcome Back</h1>
          <p className="text-body text-dark-grey">Sign in to your NAK Sports account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-body text-dark font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-body text-dark font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="btn-primary w-full"
          >
            {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={() => setIsRecovering(true)}
            className="w-full text-body text-primary font-medium hover:underline"
          >
            Forgot your password?
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-body text-dark-grey">
            Don't have an account?{' '}
            <button className="text-primary font-medium hover:underline">
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 