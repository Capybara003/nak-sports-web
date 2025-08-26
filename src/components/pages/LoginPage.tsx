import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      AuthService.login(credentials),
    onSuccess: () => {
      if (staySignedIn) {
        localStorage.setItem('staySignedIn', 'true');
      } else {
        localStorage.removeItem('staySignedIn');
      }
      onLogin();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const recoverPasswordMutation = useMutation({
    mutationFn: (email: string) => AuthService.recoverPassword(email),
    onSuccess: () => {
      toast.success('Password recovery email sent!');
      setIsRecovering(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
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
      <div className="min-h-screen bg-[#0f264a] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-center text-white text-3xl font-semibold mb-8">Recover Password</h1>
          <form onSubmit={handleRecoverPassword} className="space-y-4">
            <div>
              <input
                id="recover-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Email"
                required
              />
            </div>
            <button type="submit" disabled={recoverPasswordMutation.isPending} className="w-full py-4 rounded-xl bg-white text-[#0f264a] font-bold">
              {recoverPasswordMutation.isPending ? 'Sending...' : 'SEND RECOVERY EMAIL'}
            </button>
            <button type="button" onClick={() => setIsRecovering(false)} className="w-full text-white/80 underline">
              Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f264a] flex flex-col p-6">
      <div className="flex-1 w-full max-w-md mx-auto flex flex-col justify-start">
        <h1 className="text-center text-white text-4xl font-semibold mt-20 mb-10">Log in</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 pr-16 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <label className="flex items-center space-x-3 text-white">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-white/40 bg-transparent"
              checked={staySignedIn}
              onChange={(e) => setStaySignedIn(e.target.checked)}
            />
            <span>Stay signed in</span>
          </label>

          <button
            type="button"
            onClick={() => setIsRecovering(true)}
            className="w-full text-center text-white/80"
          >
            Did you forget your password?
          </button>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-4 rounded-xl bg-[#f26a0a] text-white font-bold"
          >
            {loginMutation.isPending ? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mx-auto text-center mt-10 mb-6">
        <p className="text-white/80">
          Don't have an account?
        </p>
        <button className="text-white font-semibold underline mt-2" onClick={() => navigate('/register')}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 