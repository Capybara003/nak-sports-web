import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../../services/api';

const EditProfilePage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({ queryKey: ['currentUser'], queryFn: () => UserService.getCurrentUser() });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: () => UserService.updateProfile({ firstName, lastName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Edit Profile</h1>
      <div className="card">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
          {mutation.error && <p className="text-error">{(mutation.error as Error).message}</p>}
          {mutation.isSuccess && <p className="text-success">Profile updated.</p>}
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage; 