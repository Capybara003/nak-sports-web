import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookingService } from '../../services/api';
import { Booking } from '../../types';

const AgendaPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Fetch upcoming bookings
  const { data: upcomingBookings, isLoading, error } = useQuery({
    queryKey: ['upcomingBookings'],
    queryFn: () => BookingService.getUpcomingBookings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
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
          <h1 className="text-h1 text-dark font-oswald mb-2">Agenda</h1>
          <p className="text-body text-dark-grey">Your upcoming sports activities</p>
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
          <h1 className="text-h1 text-dark font-oswald mb-2">Agenda</h1>
          <p className="text-body text-dark-grey">Your upcoming sports activities</p>
        </div>
        <div className="card">
          <div className="text-center py-8">
            <div className="text-error text-4xl mb-4">⚠️</div>
            <p className="text-body text-dark mb-2">Failed to load agenda</p>
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
        <h1 className="text-h1 text-dark font-oswald mb-2">Agenda</h1>
        <p className="text-body text-dark-grey">Your upcoming sports activities</p>
      </div>

      {upcomingBookings && upcomingBookings.length > 0 ? (
        <div className="space-y-4">
          {upcomingBookings.map((booking: Booking) => (
            <div key={booking.hash} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
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
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-grey">🕒</span>
                      <span className="text-body text-dark">
                        {formatTime(booking.event?.startDate || 0, booking.event?.endDate || 0)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-grey">📅</span>
                      <span className="text-body text-dark">
                        {formatDate(booking.date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-grey">📍</span>
                      <span className="text-body text-dark">
                        {booking.event?.location || 'Location not specified'}
                      </span>
                    </div>
                    {booking.price && (
                      <div className="flex items-center space-x-2">
                        <span className="text-grey">💰</span>
                        <span className="text-body text-dark">
                          ${booking.price.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.isCanceled 
                      ? 'bg-error text-white' 
                      : 'bg-success text-white'
                  }`}>
                    {booking.isCanceled ? 'Canceled' : 'Confirmed'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📅</div>
            <p className="text-body text-dark mb-2">No upcoming activities</p>
            <p className="text-body text-dark-grey mb-4">Book your first sports activity to get started!</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button className="btn-primary w-full">
          Book New Activity
        </button>
      </div>
    </div>
  );
};

export default AgendaPage; 