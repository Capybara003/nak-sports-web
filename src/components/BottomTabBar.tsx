import React from 'react';
import CalendarIcon from '../assets/icons/Calendar.svg';
import HistoricIcon from '../assets/icons/Historic.svg';
import CreditCardIcon from '../assets/icons/credit-card.svg';
import SearchIcon from '../assets/icons/Search.svg';
import MenuIcon from '../assets/icons/Menu.svg';

interface BottomTabBarProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 0, name: 'Agenda', icon: CalendarIcon },
    { id: 1, name: 'History', icon: HistoricIcon },
    { id: 2, name: 'Booking', icon: CreditCardIcon },
    { id: 3, name: 'Map', icon: SearchIcon },
    { id: 4, name: 'Menu', icon: MenuIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-grey">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-dark-grey hover:text-primary'
            }`}
          >
            <img src={tab.icon} alt={tab.name} className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomTabBar; 