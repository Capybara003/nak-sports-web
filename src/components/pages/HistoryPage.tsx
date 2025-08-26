import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookingService } from '../../services/api';
import { Booking } from '../../types';

const HistoryPage: React.FC = () => {
  // Fetch past bookings
  const { data: pastBookings, isLoading, error } = useQuery({
    queryKey: ['pastBookings'],
    queryFn: () => BookingService.getPastBookings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (startTimestamp: number, endTimestamp: number) => {
    const start = new Date(startTimestamp);
    const end = new Date(endTimestamp);
    
    const startTime = start.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    const endTime = end.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    return `${startTime} - ${endTime}`;
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-light-grey min-h-screen">
        <div className="mb-6">
          <h1 className="text-h1 text-dark font-oswald mb-2">History</h1>
          <p className="text-body text-dark-grey">Your completed sports activities</p>
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
          <h1 className="text-h1 text-dark font-oswald mb-2">History</h1>
          <p className="text-body text-dark-grey">Your completed sports activities</p>
        </div>
        <div className="card">
          <div className="text-center py-8">
            <div className="text-error text-4xl mb-4">⚠️</div>
            <p className="text-body text-dark mb-2">Failed to load history</p>
            <p className="text-body text-dark-grey mb-4">Please try again later</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-light-grey min-h-screen">
      <div className="mb-6">
        <h1 className="text-h1 text-dark font-oswald mb-2">History</h1>
        <p className="text-body text-dark-grey">Your completed sports activities</p>
      </div>

      {pastBookings && pastBookings.length > 0 ? (
        <div className="space-y-4">
          {pastBookings.map((booking: Booking) => (
            <div key={booking.hash} className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {booking.sportIcon || booking.event?.sport?.name?.charAt(0) || 'S'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-h2 text-dark font-oswald">
                      {booking.event?.title || 'Untitled Event'}
                    </h3>
                    <p className="text-body text-dark-grey">
                      {booking.event?.instructor?.firstName} {booking.event?.instructor?.lastName}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-body text-dark-grey">
                    {formatDate(booking.date)}
                  </p>
                  {/* Note: Rating system would need to be implemented separately */}
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-grey">★</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-grey">📍</span>
                  <span className="text-body text-dark">
                    {booking.event?.location || 'Location not specified'}
                  </span>
                </div>
                {booking.event?.startDate && booking.event?.endDate && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-grey">🕒</span>
                    <span className="text-body text-dark">
                      {formatTime(booking.event.startDate, booking.event.endDate)}
                    </span>
                  </div>
                )}
                {booking.price && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-grey">💰</span>
                    <span className="text-body text-dark">
                      ${booking.price.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Note: Review system would need to be implemented separately */}
              <div className="bg-light-grey p-3 rounded-lg">
                <p className="text-body text-dark italic">
                  "Great experience! Would recommend to others."
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-body text-dark mb-2">No completed activities yet</p>
            <p className="text-body text-dark-grey mb-4">Complete your first booking to see it here!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage; 