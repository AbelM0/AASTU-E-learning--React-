import { createContext, useState, useContext, useEffect } from "react";

const userContext = createContext();

export function useUserContext(){
  return useContext(userContext);
}

export function UserContextProvider({children}){
  const [ user, setUser ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    // Load user from local storage when the app initializes
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
  }, []);

  const setUserAndStore = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const clearError = () => {
    setError(null);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };



  const value={
    user,
    setUser,
    error,
    setError,
    clearError,
    setUserAndStore,
    clearUser
  };

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}