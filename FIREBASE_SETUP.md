# Firebase Setup Instructions

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "expense-tracker-app")
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Google" as a sign-in provider
5. Add your project's support email
6. Click "Save"

## 3. Get Your Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Enter an app nickname (e.g., "Expense Tracker Web")
6. Click "Register app"
7. Copy the Firebase configuration object

## 4. Update the Configuration

Replace the placeholder values in `src/firebase/config.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## 5. Set Up Firestore (Optional)

If you want to store user data in Firestore:

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Click "Done"

## 6. Configure OAuth Consent Screen (Required for Google Auth)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to "APIs & Services" > "OAuth consent screen"
4. Choose "External" user type
5. Fill in the required information:
   - App name: "Redneck Penny Pinch"
   - User support email: your email
   - Developer contact information: your email
6. Add your domain to authorized domains
7. Add test users if needed

## 7. Test the Authentication

1. Start your development server: `npm run dev`
2. Open your app in the browser
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to the main app

## Security Notes

- Never commit your Firebase configuration to version control in production
- Use environment variables for sensitive configuration
- Set up proper Firestore security rules
- Configure authorized domains in Firebase Authentication settings

## Troubleshooting

- **"This app is not verified"**: This is normal for development. Click "Advanced" and "Go to [app name] (unsafe)"
- **"Error 400: redirect_uri_mismatch"**: Make sure your domain is added to authorized domains in Google Cloud Console
- **"Error 403: access_denied"**: Check your OAuth consent screen configuration
