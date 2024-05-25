import { createContext, useState, useContext, useEffect } from "react";

const joinedClassesContext = createContext();

export function useJoinedClassesContext(){
  return useContext(joinedClassesContext);
}

export function JoinedClassesContextProvider({children}){
  const [ error, setError ] = useState(null);
  const [ joinedClasses, setJoinedClasses ] = useState([]);


  useEffect(() => {
    // Load user from local storage when the app initializes
    const storedJoinedClasses = localStorage.getItem('JoinedClasses');
    if (storedJoinedClasses) {
      setJoinedClasses(JSON.parse(storedJoinedClasses));
    }
    
  }, []);

  const setJoinedClassesAndStore = (JoinedClasses) => {
    setJoinedClasses(JoinedClasses);
    localStorage.setItem('JoinedClasses', JSON.stringify(JoinedClasses));
  };

  const clearError = () => {
    setError(null);
  };

  const clearJoinedClasses = () => {
    setJoinedClasses([]);
    localStorage.removeItem('JoinedClasses');
  };



  const value={
    error, setError, joinedClasses, setJoinedClasses, clearError, setJoinedClassesAndStore, clearJoinedClasses
  };

  return (
    <joinedClassesContext.Provider value={value}>
      {children}
    </joinedClassesContext.Provider>
  )
}