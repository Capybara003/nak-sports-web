# NAK Sports Web

A React + Tailwind CSS web application that replicates the design and functionality of the NAK Sports mobile app.

## Features

- **Agenda**: View upcoming sports activities and lessons
- **History**: Track completed activities with ratings and reviews
- **Booking**: Browse and book available sports activities
- **Map**: Find sports locations near you
- **Menu**: User profile and app settings

## Design System

### Colors
- **Primary**: #F06400 (Orange)
- **Background**: #192D56 (Dark Blue)
- **Success**: #50D45E (Green)
- **Error**: #E94043 (Red)
- **Dark**: #101E39 (Very Dark Blue)
- **Grey**: #D8DBDF (Light Grey)
- **White**: #FFFFFF

### Typography
- **Titles**: Oswald font family
- **Body**: Roboto font family
- **Custom font sizes**: h1, h2, body, button, caption, etc.

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS 3** for styling
- **Custom design system** matching the Flutter app
- **Responsive design** for mobile and desktop

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nak-sports-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── pages/
│   │   ├── AgendaPage.tsx      # Upcoming activities
│   │   ├── HistoryPage.tsx     # Past activities
│   │   ├── BookingPage.tsx     # Book new activities
│   │   ├── MapPage.tsx         # Location finder
│   │   └── MenuPage.tsx        # User settings
│   ├── HomePage.tsx            # Main container
│   └── BottomTabBar.tsx        # Navigation
├── App.tsx                     # Main app component
├── index.css                   # Tailwind + custom styles
└── index.tsx                   # Entry point
```

## Custom Components

### Button Classes
- `.btn-primary`: Primary orange button
- `.btn-secondary`: Secondary dark blue button

### Card Classes
- `.card`: Standard card with shadow and padding
- `.nav-item`: Navigation item with hover effects

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Design Philosophy

This web app maintains the exact same visual identity as the Flutter mobile app:
- Same color scheme and typography
- Consistent spacing and layout patterns
- Matching component designs
- Identical user experience flow

## Future Enhancements

- Google Maps integration for the Map page
- User authentication system
- Real-time booking functionality
- Payment processing integration
- Push notifications
- Progressive Web App (PWA) features

## Contributing

1. Follow the existing code style and patterns
2. Maintain the design system consistency
3. Test on both mobile and desktop viewports
4. Ensure accessibility standards are met

## License

This project is part of the NAK Sports application suite.
