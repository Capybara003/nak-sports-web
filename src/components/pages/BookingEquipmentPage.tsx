import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { BookingService } from '../../services/api';

const BookingEquipmentPage: React.FC = () => {
  const [eventHash, setEventHash] = useState('');
  const [date, setDate] = useState('');
  const [userVoucherHash, setUserVoucherHash] = useState('');
  const [message, setMessage] = useState('');

  const mutation = useMutation({
    mutationFn: () => BookingService.createBooking({
      eventHash,
      date: date ? new Date(date).getTime() : Date.now(),
      userHash: localStorage.getItem('userHash') || '',
      isCourse: false,
      isSmallCourse: false,
      isLesson: false,
      isEquipmentRent: true,
      userVoucherHash: userVoucherHash || undefined,
    }),
    onSuccess: () => setMessage('Equipment booking created successfully'),
    onError: (e: any) => setMessage(e.message),
  });

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Book Equipment</h1>
      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Hash</label>
          <input className="input" value={eventHash} onChange={(e) => setEventHash(e.target.value)} placeholder="event hash" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input className="input" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Voucher (optional)</label>
          <input className="input" value={userVoucherHash} onChange={(e) => setUserVoucherHash(e.target.value)} placeholder="user voucher hash" />
        </div>
        <button className="btn-primary" onClick={() => mutation.mutate()} disabled={mutation.isPending || !eventHash}>
          {mutation.isPending ? 'Booking...' : 'Create Equipment Booking'}
        </button>
        {message && <p className="text-body">{message}</p>}
      </div>
    </div>
  );
};

export default BookingEquipmentPage; 