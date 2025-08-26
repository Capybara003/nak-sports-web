import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MapService } from '../../services/api';
import { MapLocation } from '../../types';

const UserFavoritesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['favoriteLocations'],
    queryFn: () => MapService.getUserFavoriteLocations(),
    staleTime: 60 * 1000,
  });

  const removeMutation = useMutation({
    mutationFn: (hash: string) => MapService.removeLocationFromFavorites(hash),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favoriteLocations'] }),
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-error">{(error as Error).message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Favorites</h1>
      {locations && locations.length > 0 ? (
        <div className="space-y-2">
          {locations.map((location: MapLocation) => (
            <div key={location.hash} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-h2">{location.name}</h3>
                  <p className="text-body text-dark-grey">{location.address}</p>
                </div>
                <button className="btn-danger" onClick={() => removeMutation.mutate(location.hash)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-8">
            <div className="text-4xl mb-2">❤️</div>
            <p className="text-body text-dark">No favorite locations yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFavoritesPage; 