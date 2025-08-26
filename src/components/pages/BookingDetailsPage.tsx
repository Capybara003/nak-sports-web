import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BookingService } from '../../services/api';
import { Booking } from '../../types';

function useQueryParams() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const BookingDetailsPage: React.FC = () => {
  const params = useQueryParams();
  const bookingHash = params.get('hash') || '';

  const { data: booking, isLoading, error } = useQuery<Booking>({
    queryKey: ['booking', bookingHash],
    queryFn: () => BookingService.getBookingByHash(bookingHash),
    enabled: !!bookingHash,
  });

  if (!bookingHash) {
    return <div className="p-4 text-error">Missing booking hash.</div>;
  }

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-error">{(error as Error).message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Booking Details</h1>
      {booking && (
        <div className="card space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-h2">{booking.event?.title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.isCanceled ? 'bg-error text-white' : 'bg-success text-white'}`}>
              {booking.isCanceled ? 'Canceled' : 'Confirmed'}
            </span>
          </div>
          <p className="text-body text-dark-grey">{booking.event?.location}</p>
          <p className="text-body text-dark-grey">{new Date(booking.date).toLocaleString()}</p>
          {booking.price && <p className="text-body text-primary font-medium">${booking.price.toFixed(2)}</p>}
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage; 