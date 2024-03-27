import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of your user object
interface UserType {
  email: string;
  credits: number;
}

// Optional: Define the shape of the context state including methods to update the state if necessary
interface UserState {
  user: UserType | null; // The user is either an object of UserType or null (if not logged in)
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>; // Function to update the user state
}

// Create a context with an undefined initial state
const UserContext = createContext<UserState | undefined>(undefined);

// Define the props for your provider component
interface UserProviderProps {
  children: ReactNode;
}

// Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Initialize user state as null or from a persisted state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for using the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
