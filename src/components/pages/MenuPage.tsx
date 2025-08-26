import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserService, AuthService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../assets/icons/Phone.svg';
import CardIcon from '../../assets/icons/credit-card.svg';
import HeartIcon from '../../assets/icons/whatsapp.svg';
import BellIcon from '../../assets/icons/Message.svg';
import HelpIcon from '../../assets/icons/Photo.svg';
import PrivacyIcon from '../../assets/icons/Phone.svg';
import TermsIcon from '../../assets/icons/Historic.svg';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => UserService.getCurrentUser(),
    staleTime: 10 * 60 * 1000,
  });

  const handleLogout = () => {
    AuthService.logout();
  };

  const menuItems = [
    { id: 1, name: 'Profile', icon: ProfileIcon, description: 'View and edit your profile', route: '/profile' },
    { id: 2, name: 'Payment Methods', icon: CardIcon, description: 'Manage your payment options', route: '/payment-methods' },
    { id: 3, name: 'Favorites', icon: HeartIcon, description: 'Your saved activities and locations', route: '/favorites' },
    { id: 4, name: 'Notifications', icon: BellIcon, description: 'Configure notification preferences', route: '/notifications' },
    { id: 5, name: 'Help & Support', icon: HelpIcon, description: 'Get help and contact support', route: '/help' },
    { id: 6, name: 'Privacy Policy', icon: PrivacyIcon, description: 'Read our privacy policy', route: '/privacy-policy' },
    { id: 7, name: 'Terms & Conditions', icon: TermsIcon, description: 'Read our terms of service', route: '/terms' },
  ];

  if (isLoading) {
    return (
      <div className="p-4 bg-light-grey min-h-screen">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-light-grey min-h-screen">
      <div className="card mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <span className="text-white font-bold text-xl">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-h2 text-dark font-oswald">{user?.firstName} {user?.lastName}</h2>
            <p className="text-body text-dark-grey">{user?.email}</p>
            <p className="text-body text-primary font-medium">Premium Member</p>
          </div>
          <button className="text-primary" onClick={() => navigate('/edit-profile')}>
            <span className="text-2xl">✏️</span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <div key={item.id} className="card">
            <button className="w-full text-left" onClick={() => navigate(item.route)}>
              <div className="flex items-center space-x-4">
                <img src={item.icon} alt={item.name} className="w-6 h-6" />
                <div className="flex-1">
                  <h3 className="text-h2 text-dark font-oswald">{item.name}</h3>
                  <p className="text-body text-dark-grey">{item.description}</p>
                </div>
                <div className="text-grey">
                  <span className="text-xl">›</span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button onClick={handleLogout} className="w-full bg-error text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-200">
          Logout
        </button>
      </div>

      <div className="text-center mt-8">
        <p className="text-body text-dark-grey">NAK Sports v2.99.1</p>
      </div>
    </div>
  );
};

export default MenuPage; 