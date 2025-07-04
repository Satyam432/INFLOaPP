# Inflo Mobile App

A creator-brand collaboration platform built with React Native and Expo.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or later)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## 📱 Demo Login

Use these credentials to test the app:

- **Email**: Any valid email address
- **OTP**: `123456`
- **Roles**: Choose between Creator or Brand

## 🏗️ Project Structure

```
inflo-app/
├── components/             # Reusable UI components
├── constants/              # App constants (Colors, Routes, Fonts)
├── navigation/             # Navigation setup
├── screens/                # App screens
│   ├── common/            # Shared screens (Login, OTP, etc.)
│   ├── creator/           # Creator-specific screens
│   └── brand/             # Brand-specific screens
├── services/              # API services and mock data
├── state/                 # Zustand state management
├── utils/                 # Utility functions
└── App.js                 # Main app component
```

## 🎨 Features

### Creator Flow
- ✅ Complete profile onboarding
- ✅ Portfolio management
- ✅ View and respond to brand offers
- ✅ Chat with brands
- ✅ Earnings dashboard

### Brand Flow
- ✅ Brand profile setup
- ✅ Campaign creation and management
- ✅ Creator discovery and search
- ✅ Send offers to creators
- ✅ Chat with creators

### Shared Features
- ✅ OTP-based authentication
- ✅ Role-based navigation
- ✅ Real-time messaging
- ✅ Responsive UI with NativeWind
- ✅ State management with Zustand

## 🛠️ Tech Stack

- **Frontend**: React Native + Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **Authentication**: OTP-based with SecureStore
- **Icons**: Expo Vector Icons
- **Mock Data**: Local JSON data for development

## 📝 Development Notes

- All screens are fully functional with mock data
- Authentication flow is complete with role-based routing
- Responsive design works on various screen sizes
- Uses Expo managed workflow for easy development

## 📄 License

This project is for demonstration purposes. 