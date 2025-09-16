import { db } from '../firebase/config';
import {
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
} from 'firebase/firestore';
import type { Transaction, Category, Budget, Asset, AssetCategory } from '../types';

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
const getUserDoc = (userId: string) => doc(db, 'users', userId);

// Recursively clean data to remove undefined values
const cleanDataForFirestore = (data: any): any => {
    if (data === null || data === undefined) {
        return null;
    }

    if (Array.isArray(data)) {
        return data.map(item => cleanDataForFirestore(item)).filter(item => item !== undefined);
    }

    if (typeof data === 'object') {
        const cleaned: any = {};
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (value !== undefined) {
                cleaned[key] = cleanDataForFirestore(value);
            }
        });
        return cleaned;
    }

    return data;
};

// Clean user data specifically for Firestore
const cleanUserDataForFirestore = (data: any): any => {
    const cleaned = cleanDataForFirestore(data);

    // Ensure all required fields exist with proper defaults
    cleaned.transactions = cleaned.transactions || [];
    cleaned.categories = cleaned.categories || [];
    cleaned.budgets = cleaned.budgets || [];
    cleaned.assets = cleaned.assets || [];
    cleaned.assetCategories = cleaned.assetCategories || [];

    // Ensure preferences object exists and is properly structured
    cleaned.preferences = {
        darkMode: cleaned.preferences?.darkMode ?? false
    };

    return cleaned;
};

// Save user data to Firestore
export const saveUserData = async (userId: string, data: UserData): Promise<void> => {
    try {
        const userDoc = getUserDoc(userId);
        const cleanedData = cleanUserDataForFirestore(data);
        await setDoc(userDoc, {
            ...cleanedData,
            lastUpdated: serverTimestamp()
        });
    } catch (error) {
        console.error('Error saving user data:', error);
        console.error('Data being saved:', JSON.stringify(cleanedData, null, 2));
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
            delete data.lastUpdated;

            // Ensure preferences.darkMode is always defined
            if (!data.preferences) {
                data.preferences = { darkMode: false };
            } else if (data.preferences.darkMode === undefined) {
                data.preferences.darkMode = false;
            }

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

            // Ensure preferences.darkMode is always defined
            if (!data.preferences) {
                data.preferences = { darkMode: false };
            } else if (data.preferences.darkMode === undefined) {
                data.preferences.darkMode = false;
            }

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
        transactions: cleanDataForFirestore(transactions),
        lastUpdated: serverTimestamp()
    });
};

export const saveCategories = async (userId: string, categories: Category[]): Promise<void> => {
    const userDoc = getUserDoc(userId);
    await updateDoc(userDoc, {
        categories: cleanDataForFirestore(categories),
        lastUpdated: serverTimestamp()
    });
};

export const saveBudgets = async (userId: string, budgets: Budget[]): Promise<void> => {
    const userDoc = getUserDoc(userId);
    await updateDoc(userDoc, {
        budgets: cleanDataForFirestore(budgets),
        lastUpdated: serverTimestamp()
    });
};

export const saveAssets = async (userId: string, assets: Asset[]): Promise<void> => {
    const userDoc = getUserDoc(userId);
    await updateDoc(userDoc, {
        assets: cleanDataForFirestore(assets),
        lastUpdated: serverTimestamp()
    });
};

export const saveAssetCategories = async (userId: string, assetCategories: AssetCategory[]): Promise<void> => {
    const userDoc = getUserDoc(userId);
    await updateDoc(userDoc, {
        assetCategories: cleanDataForFirestore(assetCategories),
        lastUpdated: serverTimestamp()
    });
};

export const savePreferences = async (userId: string, preferences: { darkMode: boolean }): Promise<void> => {
    const userDoc = getUserDoc(userId);
    const cleanedPreferences = cleanDataForFirestore(preferences);
    await updateDoc(userDoc, {
        preferences: cleanedPreferences,
        lastUpdated: serverTimestamp()
    });
};
