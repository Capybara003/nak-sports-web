import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '../../services/api';
import { Event, SearchFilters } from '../../types';
import { useNavigate } from 'react-router-dom';

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({});

  const { data: events, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => EventService.getAvailableEvents(filters),
    staleTime: 60 * 1000,
  });

  const onChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const bookEvent = (ev: Event) => {
    const dateStr = new Date(ev.startDate).toISOString();
    navigate(`/booking/lesson?eventHash=${encodeURIComponent(ev.hash)}&date=${encodeURIComponent(dateStr)}`);
  };

  return (
    <div className="p-4 bg-light-grey min-h-screen">
      <div className="mb-4 flex items-end space-x-2">
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input className="input" placeholder="City or area" onChange={(e) => onChange('location', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sport</label>
          <input className="input" placeholder="e.g., Tennis" onChange={(e) => onChange('sport', e.target.value)} />
        </div>
        <button className="btn-primary" onClick={() => refetch()} disabled={isFetching}> {isFetching ? 'Searching...' : 'Search'} </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      {error && <div className="text-error">{(error as Error).message}</div>}

      <div className="space-y-2">
        {events?.map((ev: Event) => (
          <div key={ev.hash} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-h2">{ev.title}</h3>
                <p className="text-body text-dark-grey">{ev.sport?.name} • {ev.location}</p>
              </div>
              <div className="text-right">
                <p className="text-body text-dark">{new Date(ev.startDate).toLocaleString()}</p>
                <p className="text-body text-primary font-medium">${ev.price.toFixed(2)}</p>
                <button className="btn-primary mt-2" onClick={() => bookEvent(ev)}>Book</button>
              </div>
            </div>
          </div>
        ))}
        {!isLoading && events && events.length === 0 && (
          <div className="card">
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔎</div>
              <p className="text-body text-dark">No events found. Try adjusting filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage; 