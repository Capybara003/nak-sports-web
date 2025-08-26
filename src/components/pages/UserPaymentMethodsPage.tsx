import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../../services/api';

const UserPaymentMethodsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: methods, isLoading, error } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: () => UserService.getPaymentMethods(),
  });

  const removeMutation = useMutation({
    mutationFn: (hash: string) => UserService.removePaymentMethod(hash),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['paymentMethods'] }),
  });

  const defaultMutation = useMutation({
    mutationFn: (hash: string) => UserService.setDefaultPaymentMethod(hash),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['paymentMethods'] }),
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-error">{(error as Error).message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Payment Methods</h1>

      <div className="space-y-2">
        {methods?.map((m) => (
          <div key={m.hash} className="card flex items-center justify-between">
            <div>
              <p className="text-body text-dark">{m.brand} •••• {m.last4}</p>
              <p className="text-sm text-dark-grey">Expires {m.expiryMonth}/{m.expiryYear}</p>
              {m.isDefault && <p className="text-xs text-primary mt-1">Default</p>}
            </div>
            <div className="space-x-2">
              {!m.isDefault && <button className="btn-secondary" onClick={() => defaultMutation.mutate(m.hash)}>Make Default</button>}
              <button className="btn-danger" onClick={() => removeMutation.mutate(m.hash)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPaymentMethodsPage; 