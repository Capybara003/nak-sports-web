import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthService } from './services/api';
import './App.css';
import BottomTabBar from './components/BottomTabBar';
import LoginPage from './components/pages/LoginPage';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AgendaPage from './components/pages/AgendaPage';
import HistoryPage from './components/pages/HistoryPage';
import BookingPage from './components/pages/BookingPage';
import MapPage from './components/pages/MapPage';
import MenuPage from './components/pages/MenuPage';
import ExplorePage from './components/pages/ExplorePage';
import ProfilePage from './components/pages/ProfilePage';
import RegisterPage from './components/pages/RegisterPage';
import PasswordRecoveryPage from './components/pages/PasswordRecoveryPage';
import ChangePasswordPage from './components/pages/ChangePasswordPage';
import EditProfilePage from './components/pages/EditProfilePage';
import HelpPage from './components/pages/HelpPage';
import UserFavoritesPage from './components/pages/UserFavoritesPage';
import UserNotificationsPage from './components/pages/UserNotificationsPage';
import UserPaymentMethodsPage from './components/pages/UserPaymentMethodsPage';
import UserVouchersPage from './components/pages/UserVouchersPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';
import TermsConditionsPage from './components/pages/TermsConditionsPage';
import LegalPage from './components/pages/LegalPage';
import BuyVoucherPage from './components/pages/BuyVoucherPage';
import BuyCoursePage from './components/pages/BuyCoursePage';
import BookingLessonPage from './components/pages/BookingLessonPage';
import BookingEquipmentPage from './components/pages/BookingEquipmentPage';
import BookingDetailsPage from './components/pages/BookingDetailsPage';
import { ToastContainer } from 'react-toastify';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on app load
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // keep activeTab in sync with path
    if (location.pathname.startsWith('/history')) setActiveTab(1);
    else if (location.pathname.startsWith('/booking')) setActiveTab(2);
    else if (location.pathname.startsWith('/map')) setActiveTab(3);
    else if (location.pathname.startsWith('/menu')) setActiveTab(4);
    else setActiveTab(0);
  }, [location.pathname]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    const paths = ['/agenda', '/history', '/booking', '/map', '/menu'];
    navigate(paths[index]);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/agenda');
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="App bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
        <ToastContainer position="top-center" theme="dark" autoClose={3000} />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App bg-white min-h-screen">
        <Routes>
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/menu" element={<MenuPage />} />

          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/favorites" element={<UserFavoritesPage />} />
          <Route path="/notifications" element={<UserNotificationsPage />} />
          <Route path="/payment-methods" element={<UserPaymentMethodsPage />} />
          <Route path="/vouchers" element={<UserVouchersPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/buy-voucher" element={<BuyVoucherPage />} />
          <Route path="/buy-course" element={<BuyCoursePage />} />
          <Route path="/booking/lesson" element={<BookingLessonPage />} />
          <Route path="/booking/equipment" element={<BookingEquipmentPage />} />
          <Route path="/booking/details" element={<BookingDetailsPage />} />

          <Route path="*" element={<AgendaPage />} />
        </Routes>

        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />        
      </div>
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
    </QueryClientProvider>
  );
}

export default App;
