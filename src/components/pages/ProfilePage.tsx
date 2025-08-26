import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/api';

const ProfilePage: React.FC = () => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => UserService.getCurrentUser(),
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-error">{(error as Error).message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Profile</h1>
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <span className="text-white font-bold text-xl">{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-body text-dark-grey">{user?.email}</p>
            <h2 className="text-h2 text-dark font-oswald">{user?.firstName} {user?.lastName}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="card">
          <h3 className="text-h2 mb-2">Preferences</h3>
          <p className="text-body text-dark-grey">Language: {user?.preferences?.language ?? '—'}</p>
          <p className="text-body text-dark-grey">Email notifications: {user?.preferences?.emailNotifications ? 'On' : 'Off'}</p>
        </div>
        <div className="card">
          <h3 className="text-h2 mb-2">Membership</h3>
          <p className="text-body text-dark-grey">Status: Premium</p>
          <p className="text-body text-dark-grey">Since: 2024</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 