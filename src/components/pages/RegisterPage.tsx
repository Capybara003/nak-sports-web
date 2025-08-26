import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname1, setSurname1] = useState('');
  const [surname2, setSurname2] = useState('');
  const [nif, setNif] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: (payload: {
      firstName: string;
      lastName: string;
      secondLastName?: string;
      nif?: string;
      address?: string;
      email: string;
      phone?: string;
      password: string;
    }) => AuthService.register(payload),
    onSuccess: () => {
      toast.success('Registration successful. Please log in.');
      navigate('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onNext = () => {
    // TODO: Wire to API registration step; for now just validate presence
    if (!name || !surname1 || !email || !password || !repeatPassword) {
      toast.error('Please fill required fields');
      return;
    }
    if (password !== repeatPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    registerMutation.mutate({
      firstName: name,
      lastName: surname1,
      secondLastName: surname2 || undefined,
      nif: nif || undefined,
      address: address || undefined,
      email,
      phone: phone || undefined,
      password,
    });
  };

  const input = (
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <input
      {...props}
      className={`w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 ${props.className || ''}`}
    />
  );

  return (
    <div className="min-h-screen bg-[#0f264a] p-6 text-white/80">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-center text-white text-4xl font-semibold mt-12 mb-8">Sign up</h1>

        <div className="space-y-4">
          {input({ placeholder: 'Name', value: name, onChange: e => setName(e.target.value) })}
          <p className="text-xs text-red-400 px-1">Enter name</p>

          {input({ placeholder: 'Surname 1', value: surname1, onChange: e => setSurname1(e.target.value) })}
          <p className="text-xs text-red-400 px-1">Enter surname</p>

          {input({ placeholder: 'Surname 2', value: surname2, onChange: e => setSurname2(e.target.value) })}

          {input({ placeholder: 'NIF number', value: nif, onChange: e => setNif(e.target.value) })}

          {input({ placeholder: 'Address', value: address, onChange: e => setAddress(e.target.value) })}

          {input({ placeholder: 'Email', type: 'email', value: email, onChange: e => setEmail(e.target.value) })}
          <p className="text-xs text-red-400 px-1">Enter email</p>

          {input({ placeholder: 'Phone', value: phone, onChange: e => setPhone(e.target.value) })}

          <div className="relative">
            {input({ placeholder: 'Password', type: showPassword ? 'text' : 'password', value: password, onChange: e => setPassword(e.target.value), className: 'pr-16' })}
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs text-red-400 px-1">Enter a password</p>

          <div className="relative">
            {input({ placeholder: 'Repeat password', type: showRepeatPassword ? 'text' : 'password', value: repeatPassword, onChange: e => setRepeatPassword(e.target.value), className: 'pr-16' })}
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
              {showRepeatPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs text-red-400 px-1">Enter a password</p>

          <button onClick={onNext} className="w-full py-4 rounded-xl bg-[#f26a0a] text-white font-bold mt-2" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Submitting...' : 'Next'}
          </button>
        </div>

        <div className="w-full max-w-md mx-auto text-center mt-10 mb-6">
          <p className="text-white/80">
            Do you already have an account?
          </p>
          <button className="text-white font-semibold underline mt-2" onClick={() => navigate('/login')}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 