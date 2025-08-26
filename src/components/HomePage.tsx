import React from 'react';
import AgendaPage from './pages/AgendaPage';
import HistoryPage from './pages/HistoryPage';
import BookingPage from './pages/BookingPage';
import MapPage from './pages/MapPage';
import MenuPage from './pages/MenuPage';

interface HomePageProps {
  activeTab: number;
}

const HomePage: React.FC<HomePageProps> = ({ activeTab }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <AgendaPage />;
      case 1:
        return <HistoryPage />;
      case 2:
        return <BookingPage />;
      case 3:
        return <MapPage />;
      case 4:
        return <MenuPage />;
      default:
        return <AgendaPage />;
    }
  };

  return (
    <div className="flex-1 pb-20">
      {renderTabContent()}
    </div>
  );
};

export default HomePage; 