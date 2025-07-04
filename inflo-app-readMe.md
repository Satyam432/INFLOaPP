# Inflo Mobile App (React Native + Expo)

A creator-brand collaboration platform built using **React Native with Expo** and powered by a **Node.js + DynamoDB backend**. This README outlines the full structure of the frontend application repository, including both **Creator** and **Brand** flows, API contracts, state management strategies, navigation logic, and folder architecture.

---

## 🧾 Project Overview

### 📲 Platform

* **Frontend**: React Native (Expo SDK 50+)
* **Backend**: Express + DynamoDB (via AWS SDK)
* **Auth**: OTP-based (email or phone)
* **Storage**: AWS S3 for image uploads (portfolio and campaign files)

---

## 📁 Folder Structure (Frontend)

```
inflo-app/
├── assets/                 # Images, logos, fonts
├── components/             # Reusable UI elements (Button, Card, InputField)
├── constants/              # Colors, Fonts, Routes
├── navigation/
│   ├── CreatorNavigator.js
│   └── BrandNavigator.js
├── screens/
│   ├── common/             # Login, Signup, OTP, Splash
│   ├── creator/            # All creator-specific screens
│   └── brand/              # All brand-specific screens
├── services/               # Axios API calls
├── state/                  # Zustand or Context API stores
├── utils/                  # Helper functions (validators, formatters)
├── App.js
└── README.md
```

---

## 🧠 App Initialization & Flow Logic

* After splash screen, check if user is authenticated.
* If not authenticated → show Login → OTP → Role selection (Creator / Brand)
* If authenticated → navigate to CreatorNavigator or BrandNavigator based on user role.

---

## 👤 Auth Flow

### 1. `POST /auth/login`

**Purpose**: Initiate login with email/phone

```json
{
  "identifier": "satyam@gmail.com"
}
```

**Response**:

```json
{
  "message": "OTP sent"
}
```

### 2. `POST /auth/verify`

**Purpose**: Verify OTP and create/retrieve user

```json
{
  "identifier": "satyam@gmail.com",
  "otp": "123456"
}
```

**Response**:

```json
{
  "token": "jwt-token",
  "user": {
    "userId": "usr123",
    "role": "creator"
  }
}
```

---

## 👤 Creator Flow

### Key Screens

* Onboarding (bio, niche, socials)
* Portfolio Setup (create, view, edit)
* View Offers
* Accept/Reject Offer
* Chat with Brands
* Earnings Dashboard

### API Endpoints

#### `GET /user/:userId`

Fetch creator profile.

#### `POST /portfolio`

Add or update creator portfolio.

#### `GET /offers/:userId`

Fetch brand offers made to the creator.

#### `POST /offer/respond`

Accept/Reject an offer.

#### `GET /campaigns/applied/:userId`

List of campaigns applied to or accepted.

#### `GET /messages/:chatId`

Fetch conversation with brand.

---

## 🏢 Brand Flow

### Key Screens

* Brand Onboarding
* Campaign Creation
* Creator Discovery (filter + search)
* Offer Management
* Chat with Creators
* Campaign Summary Dashboard

### API Endpoints

#### `POST /campaign`

Create a campaign.

#### `GET /campaigns/:brandId`

List brand's campaigns.

#### `GET /creators?filter=niche=lifestyle`

Search creators by filter.

#### `POST /offer`

Send offer to a creator.

#### `GET /offers/brand/:brandId`

Track sent offers.

#### `GET /messages/:chatId`

Get chat history with a creator.

---

## 💬 Chat and Messaging (Common)

#### `POST /chat/:campaignId`

Create a new chat thread.

#### `POST /message`

Send a message.

```json
{
  "chatId": "chat123",
  "senderId": "usr123",
  "text": "Can we start next week?"
}
```

#### `GET /chat/:chatId`

Get messages in a chat.

#### Reason:

Enables async communication and negotiation.

---

## 💰 Payments (Future Scope)

#### `POST /payment/initiate`

Create payment intent (brand to platform).

#### `GET /payment/:userId`

View payout history (creator earnings).

---

## 🗃️ Backend Data Schema (DynamoDB - Single Table)

### Table: `inflo_data`

| PK              | SK                  | Description                   |
| --------------- | ------------------- | ----------------------------- |
| USER#usr123     | PROFILE#usr123      | User profile                  |
| USER#usr123     | SOCIALS#usr123      | Social accounts               |
| USER#usr123     | PORTFOLIO#proj001   | Creator's project entry       |
| BRAND#br123     | CAMPAIGN#cmp123     | Campaign created by brand     |
| CAMPAIGN#cmp123 | APPLICATION#usr123  | Offer made to a creator       |
| USER#usr123     | OFFER#cmp123        | Creator's record of the offer |
| CHAT#chat123    | MESSAGE#<timestamp> | Chat messages                 |
| USER#usr123     | PAYMENT#pay123      | Earnings payout               |

---

## 🧠 State Management

Use **Zustand** or **Context API**:

```ts
store = {
  auth: {
    userId, token, role
  },
  campaigns: [],
  offers: [],
  chats: {}
}
```

---

## 🔐 Secure Storage (React Native)

Use `expo-secure-store` to persist:

* `JWT token`
* `userId`
* `user role`

---

## 🧪 Testing

* **Jest** for unit tests
* **MSW** for mocking API responses
* **Playwright** for UI testing (web fallback)

---

## 📈 Analytics & Tracking (Optional)

* Screen tracking using `expo-firebase-analytics`
* Event logging for engagement (offer clicks, chat starts)

---

## 📦 Dependencies

* `axios`
* `expo-secure-store`
* `react-navigation`
* `zustand`
* `nativewind`
* `react-native-paper` or `react-native-ui-lib`

---

## 🛠️ Future Enhancements

* Push notifications
* Deep links for chat/campaign
* Stripe connect integration
* Admin dashboard for moderation
* Creator verification logic

---

## 🧾 Contribution Guide

* Use conventional commits
* Maintain pixel-perfect UI as per Figma
* Ensure PRs are screenshot-tested
* Write clean, commented, and reusable code
* Respect flow segregation between `creator/` and `brand/`

---

## 👨‍💻 Maintainers

* Kumar Satyam (Fullstack Dev)
* You (Future You)

---

Let me know if you want a similar README for the backend repo (`inflo-backend`).
