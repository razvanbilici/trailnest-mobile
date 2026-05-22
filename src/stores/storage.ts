import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

// Shared AsyncStorage adapter for zustand's persist middleware.
// Each store imports this and passes it to `persist({ ... storage })`.
export const persistStorage = createJSONStorage(() => AsyncStorage);
