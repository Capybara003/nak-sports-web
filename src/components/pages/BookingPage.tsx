import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventService, SportService } from '../../services/api';
import { Event, Sport } from '../../types';

const BookingPage: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>('all');

  // Fetch available sports
  const { data: sports, isLoading: sportsLoading } = useQuery({
    queryKey: ['sports'],
    queryFn: () => SportService.getAllSports(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch available events
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events', selectedSport],
    queryFn: () => selectedSport === 'all' 
      ? EventService.getAvailableEvents()
      : EventService.getEventsBySport(selectedSport),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isLoading = sportsLoading || eventsLoading;

  if (isLoading) {
    return (
      <div className="p-4 bg-light-grey min-h-screen">
        <div className="mb-6">
          <h1 className="text-h1 text-dark font-oswald mb-2">Book Activities</h1>
          <p className="text-body text-dark-grey">Choose your next adventure</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-light-grey min-h-screen">
      <div className="mb-6">
        <h1 className="text-h1 text-dark font-oswald mb-2">Book Activities</h1>
        <p className="text-body text-dark-grey">Choose your next adventure</p>
      </div>

      {/* Sport Filter */}
      {sports && sports.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSport('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSport === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark hover:bg-light-grey'
              }`}
            >
              All Sports
            </button>
            {sports.map((sport: Sport) => (
              <button
                key={sport.hash}
                onClick={() => setSelectedSport(sport.hash)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSport === sport.hash
                    ? 'bg-primary text-white'
                    : 'bg-white text-dark hover:bg-light-grey'
                }`}
              >
                {sport.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Events List */}
      {events && events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event: Event) => (
            <div key={event.hash} className="card">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">
                  {event.sport?.icon || '🏃‍♂️'}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-h2 text-dark font-oswald">
                      {event.title}
                    </h3>
                    <span className="text-h2 text-primary font-bold">
                      ${event.price?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  
                  <p className="text-body text-dark-grey mb-3">
                    {event.description || 'No description available'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-grey">⏱️</span>
                      <span className="text-body text-dark">
                        {event.startDate && event.endDate 
                          ? `${Math.round((event.endDate - event.startDate) / (1000 * 60))} min`
                          : 'Duration not specified'
                        }
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-grey">👤</span>
                      <span className="text-body text-dark">
                        {event.instructor?.firstName} {event.instructor?.lastName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <span className="text-grey">📍</span>
                      <span className="text-body text-dark">
                        {event.location || 'Location not specified'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <span className="text-grey">📅</span>
                      <span className="text-body text-dark">
                        {event.startDate 
                          ? new Date(event.startDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Date not specified'
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="btn-primary flex-1">
                      Book Now
                    </button>
                    <button className="btn-secondary flex-1">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏃‍♂️</div>
            <p className="text-body text-dark mb-2">No activities available</p>
            <p className="text-body text-dark-grey">Check back later for new activities</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage; 