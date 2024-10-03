import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the UserStore interface
interface UserStore {
  user: User | null;                // User state (initially null)
  setUser: (newUser: User) => void; // Function to set user
  updateUser: (updatedUser: Partial<User>) => void; // Function to update user
  clearUser: () => void;            // Function to clear user
}

// Create the Zustand store with persistence
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,  // Initial state

      // Set the user data
      setUser: (newUser: User) => set(() => ({ user: newUser })),

      // Update user data by merging the existing and updated fields
      updateUser: (updatedUser: Partial<User>) => set((state) => ({
        user: state.user ? { ...state.user, ...updatedUser } : null,
      })),

      // Clear the user data (set to null)
      clearUser: () => set(() => ({ user: null })),
    }),
    {
      name: "user-storage", // Name for the localStorage key
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null; // Parse the string to JSON
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value)); // Store as a JSON string
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
