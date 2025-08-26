import React, { useState } from 'react';
import { AuthService } from '../../services/api';

const PasswordRecoveryPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const submit = async () => {
    setStatus('loading');
    setMessage('');
    try {
      await AuthService.recoverPassword(email);
      setStatus('success');
      setMessage('If the email exists, a recovery link has been sent.');
    } catch (e) {
      setStatus('error');
      setMessage((e as Error).message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Password Recovery</h1>
      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={submit} disabled={status === 'loading' || !email}>
          {status === 'loading' ? 'Sending...' : 'Send Recovery Email'}
        </button>
        {message && (
          <p className={status === 'error' ? 'text-error' : 'text-success'}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default PasswordRecoveryPage; 