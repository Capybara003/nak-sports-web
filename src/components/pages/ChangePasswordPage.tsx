import React, { useState } from 'react';
import { UserService } from '../../services/api';

const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const submit = async () => {
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      await UserService.changePassword(currentPassword, newPassword);
      setStatus('success');
      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e) {
      setStatus('error');
      setMessage((e as Error).message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Change Password</h1>
      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input className="input" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input className="input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input className="input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={submit} disabled={status === 'loading' || !currentPassword || !newPassword || !confirmPassword}>
          {status === 'loading' ? 'Updating...' : 'Update Password'}
        </button>
        {message && (
          <p className={status === 'error' ? 'text-error' : 'text-success'}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage; 