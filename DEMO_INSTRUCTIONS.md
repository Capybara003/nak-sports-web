# NAK Sports Web - Demo Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser to:** `http://localhost:3000`

## Demo Mode

The app includes a demo mode that uses mock data instead of real API calls. This allows you to test all functionality without setting up a backend.

### Demo Credentials
- **Email:** `demo@nak.com`
- **Password:** `demo123`

### Features Available in Demo Mode

- **Authentication:** Login/logout with demo credentials
- **Agenda:** View upcoming bookings (mock data)
- **History:** View past bookings (mock data)
- **Booking:** Browse available sports activities
- **Map:** View sports locations
- **Menu:** User profile and settings

### Mock Data Includes

- **Sports:** Surf, Golf, Equitación, Esquí
- **Events:** Various lessons and clinics
- **Locations:** Sports facilities in Mexico
- **Bookings:** Sample user bookings
- **User Profile:** Demo user information

## Real API Integration

When you're ready to connect to real APIs:

1. Update the API configuration in `src/services/api/config.ts`
2. Replace demo service calls with real API service calls
3. Set up proper authentication tokens
4. Configure CORS and API endpoints

## Project Structure

```
src/
├── components/          # React components
│   ├── pages/          # Page components
│   │   ├── AgendaPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── BookingPage.tsx
│   │   ├── MapPage.tsx
│   │   ├── MenuPage.tsx
│   │   └── LoginPage.tsx
│   ├── HomePage.tsx    # Main container
│   └── BottomTabBar.tsx # Navigation
├── services/           # API services
│   └── api/           # API integration
├── types/              # TypeScript interfaces
└── App.tsx            # Main app component
```

## Customization

- **Colors:** Update `tailwind.config.js` for brand colors
- **Fonts:** Modify `src/index.css` for custom typography
- **Layout:** Adjust component styles in Tailwind classes
- **Data:** Update mock data in `src/services/api/demoService.ts`

## Troubleshooting

- **Port conflicts:** Change port in package.json scripts
- **Build issues:** Clear node_modules and reinstall
- **Type errors:** Check TypeScript configuration
- **Styling issues:** Verify Tailwind CSS setup

## Next Steps

1. Test all pages and functionality
2. Customize design and branding
3. Integrate with real backend APIs
4. Add Google Maps integration
5. Implement real-time features
6. Add payment processing
7. Set up push notifications 