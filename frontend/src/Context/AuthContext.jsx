import { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [companyName, setCompanyName] = useState("");
  const [ isLoggedIn,setIsLoggedIn ] = useState(false);
  // Login function

  // Logout function

  return (
    <AuthContext.Provider
      value={{ user, setUser, companyName, setCompanyName,isLoggedIn,setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
