import { createContext, useContext, useState } from "react";

// Create the AuthContext
const CustomerContext = createContext();

// AuthProvider Component
export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  

  return (
    <CustomerContext.Provider value={{ customer,setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useCustomer = () => {
  return useContext(CustomerContext);
};