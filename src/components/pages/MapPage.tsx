import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapService } from '../../services/api';
import { MapLocation } from '../../types';

const MapPage: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  const { data: locations, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['locations', selectedSport, coords],
    queryFn: () => {
      if (coords) return MapService.getLocationsNearby(coords.lat, coords.lng, 15);
      return selectedSport === 'all' 
        ? MapService.getAllLocations()
        : MapService.getLocationsBySport(selectedSport);
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: popularSports } = useQuery({
    queryKey: ['popularSports'],
    queryFn: () => MapService.getPopularLocations(5),
    staleTime: 10 * 60 * 1000,
  });

  const formatDistance = (distance: number | undefined) => {
    if (distance === undefined) return '';
    return `${distance} km`;
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      refetch();
    });
  };

  const openDetails = async (location: MapLocation) => {
    setSelectedLocation(location);
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-light-grey min-h-screen">
        <div className="mb-6">
          <h1 className="text-h1 text-dark font-oswald mb-2">Map</h1>
          <p className="text-body text-dark-grey">Find sports locations near you</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-light-grey min-h-screen">
        <div className="mb-6">
          <h1 className="text-h1 text-dark font-oswald mb-2">Map</h1>
          <p className="text-body text-dark-grey">Find sports locations near you</p>
        </div>
        <div className="card">
          <div className="text-center py-8">
            <div className="text-error text-4xl mb-4">⚠️</div>
            <p className="text-body text-dark mb-2">Failed to load locations</p>
            <p className="text-body text-dark-grey mb-4">Please try again later</p>
            <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-light-grey min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-dark font-oswald mb-2">Map</h1>
          <p className="text-body text-dark-grey">Find sports locations near you</p>
        </div>
        <button className="btn-secondary" onClick={useMyLocation} disabled={isFetching}>
          {coords ? 'Near Me (On)' : 'Use My Location'}
        </button>
      </div>

      {popularSports && popularSports.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedSport('all'); setCoords(null); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedSport === 'all' ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-light-grey'}`}
            >
              All Locations
            </button>
            {popularSports.map((location: MapLocation) => (
              <button
                key={location.hash}
                onClick={() => { setSelectedSport(location.sport.hash); setCoords(null); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedSport === location.sport.hash ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-light-grey'}`}
              >
                {location.sport.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-background rounded-lg h-64 mb-6 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-body">Interactive Map</p>
          <p className="text-sm text-grey">Google Maps integration</p>
        </div>
      </div>

      {locations && locations.length > 0 ? (
        <div className="space-y-4">
          {locations.map((location: MapLocation) => (
            <div key={location.hash} className="card">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{location.sport.icon || location.sport.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-h2 text-dark font-oswald">{location.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${location.isOpen ? 'bg-success text-white' : 'bg-error text-white'}`}>
                      {location.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <p className="text-body text-dark-grey mb-2">{location.address}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-body text-dark">{location.rating}</span>
                      </div>
                      {location.distance && (
                        <div className="flex items-center space-x-1">
                          <span className="text-grey">📍</span>
                          <span className="text-body text-dark">{formatDistance(location.distance)}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-x-2">
                      <button className="btn-secondary text-sm px-4 py-2" onClick={() => openDetails(location)}>
                        Details
                      </button>
                      <button className="btn-primary text-sm px-4 py-2">
                        Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-body text-dark mb-2">No locations found</p>
            <p className="text-body text-dark-grey">Try adjusting your filters</p>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedLocation && (
        <LocationDetailsModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />
      )}

      <div className="mt-6">
        <button className="btn-secondary w-full" onClick={() => { setCoords(null); setSelectedSport('all'); }}>
          View All Locations
        </button>
      </div>
    </div>
  );
};

const LocationDetailsModal: React.FC<{ location: MapLocation; onClose: () => void }> = ({ location, onClose }) => {
  const today = new Date();
  const { data, isLoading, error } = useQuery({
    queryKey: ['locationWithEvents', location.hash, today.toDateString()],
    queryFn: () => MapService.getLocationWithEvents(location.hash, today.getTime()),
    staleTime: 60 * 1000,
  });
  const navigate = require('react-router-dom').useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end md:items-center justify-center z-50">
      <div className="bg-white w-full md:max-w-2xl rounded-t-2xl md:rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-h2">{location.name}</h2>
          <button className="text-dark-grey" onClick={onClose}>✕</button>
        </div>
        <p className="text-body text-dark-grey mb-3">{location.address}</p>
        {isLoading && <div className="py-6 text-center">Loading...</div>}
        {error && <div className="py-6 text-center text-error">Failed to load events</div>}
        {data && (
          <div className="space-y-2">
            {data.events?.map((ev: any) => (
              <div key={ev.hash} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body text-dark-grey">{new Date(ev.startDate).toLocaleString()}</p>
                    <h3 className="text-h2">{ev.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-body text-primary font-medium">${ev.price?.toFixed(2) ?? '—'}</p>
                    <button className="btn-primary mt-2" onClick={() => navigate(`/booking/lesson?eventHash=${encodeURIComponent(ev.hash)}&date=${encodeURIComponent(new Date(ev.startDate).toISOString())}`)}>Book</button>
                  </div>
                </div>
              </div>
            ))}
            {(!data.events || data.events.length === 0) && (
              <div className="text-center text-dark-grey py-6">No events today</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage; 