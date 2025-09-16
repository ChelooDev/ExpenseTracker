# Firebase Firestore Storage Implementation Template

## 1. Update Firebase Configuration

Add Firestore to your existing `src/firebase/config.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  // Your existing config here
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Export Firestore functions
export { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
};

export default app;
```

## 2. Create Firestore Service

Create `src/services/firestoreService.ts`:

```typescript
import { 
  db, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from '../firebase/config';
import { Transaction, Category, Budget, Asset, AssetCategory } from '../context/ExpenseContext';

// Collection names
const COLLECTIONS = {
  USERS: 'users',
  TRANSACTIONS: 'transactions',
  CATEGORIES: 'categories',
  BUDGETS: 'budgets',
  ASSETS: 'assets',
  ASSET_CATEGORIES: 'assetCategories'
};

// User data interface
interface UserData {
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  assets: Asset[];
  assetCategories: AssetCategory[];
  preferences: {
    darkMode: boolean;
  };
}

// Get user document reference
const getUserDoc = (userId: string) => doc(db, COLLECTIONS.USERS, userId);

// Save user data to Firestore
export const saveUserData = async (userId: string, data: UserData): Promise<void> => {
  try {
    const userDoc = getUserDoc(userId);
    await setDoc(userDoc, {
      ...data,
      lastUpdated: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

// Load user data from Firestore
export const loadUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDoc = getUserDoc(userId);
    const docSnap = await getDoc(userDoc);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Remove server timestamp fields
      delete data.lastUpdated;
      return data as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error loading user data:', error);
    throw error;
  }
};

// Real-time listener for user data
export const subscribeToUserData = (userId: string, callback: (data: UserData | null) => void) => {
  const userDoc = getUserDoc(userId);
  
  return onSnapshot(userDoc, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      delete data.lastUpdated;
      callback(data as UserData);
    } else {
      callback(null);
    }
  });
};

// Individual collection operations
export const saveTransactions = async (userId: string, transactions: Transaction[]): Promise<void> => {
  const userDoc = getUserDoc(userId);
  await updateDoc(userDoc, {
    transactions,
    lastUpdated: serverTimestamp()
  });
};

export const saveCategories = async (userId: string, categories: Category[]): Promise<void> => {
  const userDoc = getUserDoc(userId);
  await updateDoc(userDoc, {
    categories,
    lastUpdated: serverTimestamp()
  });
};

export const saveBudgets = async (userId: string, budgets: Budget[]): Promise<void> => {
  const userDoc = getUserDoc(userId);
  await updateDoc(userDoc, {
    budgets,
    lastUpdated: serverTimestamp()
  });
};

export const saveAssets = async (userId: string, assets: Asset[]): Promise<void> => {
  const userDoc = getUserDoc(userId);
  await updateDoc(userDoc, {
    assets,
    lastUpdated: serverTimestamp()
  });
};

export const saveAssetCategories = async (userId: string, assetCategories: AssetCategory[]): Promise<void> => {
  const userDoc = getUserDoc(userId);
  await updateDoc(userDoc, {
    assetCategories,
    lastUpdated: serverTimestamp()
  });
};

export const savePreferences = async (userId: string, preferences: { darkMode: boolean }): Promise<void> => {
  const userDoc = getUserDoc(userId);
  await updateDoc(userDoc, {
    preferences,
    lastUpdated: serverTimestamp()
  });
};
```

## 3. Update ExpenseContext

Modify `src/context/ExpenseContext.tsx` to include Firestore sync:

```typescript
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  saveUserData, 
  loadUserData, 
  subscribeToUserData,
  saveTransactions,
  saveCategories,
  saveBudgets,
  saveAssets,
  saveAssetCategories,
  savePreferences
} from '../services/firestoreService';

// ... existing interfaces and types ...

interface ExpenseContextType {
  state: ExpenseState;
  dispatch: React.Dispatch<ExpenseAction>;
  syncToFirestore: () => Promise<void>;
  isLoading: boolean;
  syncError: string | null;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

// ... existing reducer ...

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Load data from Firestore when user logs in
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      loadUserData(user.uid)
        .then((data) => {
          if (data) {
            dispatch({ type: 'LOAD_USER_DATA', payload: data });
          }
        })
        .catch((error) => {
          console.error('Error loading user data:', error);
          setSyncError('Failed to load data from cloud');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Reset state when user logs out
      dispatch({ type: 'RESET_STATE' });
    }
  }, [user]);

  // Sync to Firestore whenever state changes
  const syncToFirestore = async () => {
    if (!user) return;
    
    try {
      setSyncError(null);
      await saveUserData(user.uid, {
        transactions: state.transactions,
        categories: state.categories,
        budgets: state.budgets,
        assets: state.assets,
        assetCategories: state.assetCategories,
        preferences: {
          darkMode: state.darkMode
        }
      });
    } catch (error) {
      console.error('Error syncing to Firestore:', error);
      setSyncError('Failed to sync data to cloud');
    }
  };

  // Auto-sync to Firestore after state changes
  useEffect(() => {
    if (user && !isLoading) {
      const timeoutId = setTimeout(() => {
        syncToFirestore();
      }, 1000); // Debounce sync by 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [state, user, isLoading]);

  const value = {
    state,
    dispatch,
    syncToFirestore,
    isLoading,
    syncError
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
```

## 4. Add Sync Status Component

Create `src/components/SyncStatus.tsx`:

```typescript
import React from 'react';
import { useExpense } from '../context/ExpenseContext';

export default function SyncStatus() {
  const { isLoading, syncError } = useExpense();

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm">Syncing...</span>
      </div>
    );
  }

  if (syncError) {
    return (
      <div className="fixed top-4 right-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">{syncError}</span>
      </div>
    );
  }

  return null;
}
```

## 5. Update App.tsx

Add SyncStatus to your main app:

```typescript
// In src/App.tsx, add this import
import SyncStatus from './components/SyncStatus';

// In your AppContent component, add this before the closing </div>
return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* ... existing content ... */}
    
    {/* Add this line */}
    <SyncStatus />
  </div>
);
```

## 6. Firestore Security Rules

Add these rules to your Firebase Console > Firestore > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. Usage Instructions

1. **Paste the Firebase config** into `src/firebase/config.ts`
2. **Create the firestoreService.ts** file with the provided code
3. **Update ExpenseContext.tsx** with the Firestore integration
4. **Add SyncStatus component** to show sync status
5. **Update App.tsx** to include the sync status
6. **Set up Firestore security rules** in Firebase Console

## 8. Features You'll Get

- ✅ **Automatic cloud sync** - Data saves to Firestore automatically
- ✅ **Cross-device access** - Users can access data from any device
- ✅ **Offline support** - localStorage as fallback
- ✅ **Real-time updates** - Changes sync across devices
- ✅ **User-specific data** - Each user sees only their data
- ✅ **Sync status indicators** - Users know when data is syncing
- ✅ **Error handling** - Graceful fallback if sync fails

## 9. Testing

1. **Sign in** with Google
2. **Add some transactions** - they should sync to Firestore
3. **Open in another browser/device** - data should appear
4. **Check Firebase Console** - you should see user documents

This template provides a complete Firestore integration that maintains your current design while adding cloud storage capabilities!
