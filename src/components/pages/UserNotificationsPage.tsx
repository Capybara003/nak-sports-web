import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../../services/api';

const UserNotificationsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => UserService.getNotifications(),
  });

  const markRead = useMutation({
    mutationFn: (hash: string) => UserService.markNotificationAsRead(hash),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markAll = useMutation({
    mutationFn: () => UserService.markAllNotificationsAsRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const remove = useMutation({
    mutationFn: (hash: string) => UserService.deleteNotification(hash),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-error">{(error as Error).message}</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Notifications</h1>
        <button className="btn-secondary" onClick={() => markAll.mutate()}>Mark all as read</button>
      </div>

      <div className="space-y-2">
        {notifications?.map((n) => (
          <div key={n.hash} className={`card ${n.isRead ? '' : 'border-primary'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-h2">{n.title}</h3>
                <p className="text-body text-dark-grey">{n.message}</p>
              </div>
              <div className="space-x-2">
                {!n.isRead && <button className="btn-secondary" onClick={() => markRead.mutate(n.hash)}>Mark read</button>}
                <button className="btn-danger" onClick={() => remove.mutate(n.hash)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotificationsPage; 