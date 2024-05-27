import { createContext, useState, useContext, useEffect } from "react";

const createdClassesContext = createContext();

export function useCreatedClassesContext(){
  return useContext(createdClassesContext);
}

export function CreatedClassesContextProvider({children}){
  const [ error, setError ] = useState(null);
  const [ createdClasses, setCreatedClasses ] = useState([]);


  useEffect(() => {
    // Load user from local storage when the app initializes
    const storedCreatedClasses = localStorage.getItem('CreatedClasses');
    if (storedCreatedClasses) {
      setCreatedClasses(JSON.parse(storedCreatedClasses));
    }
    
  }, []);

  const setCreatedClassesAndStore = (CreatedClasses) => {
    setCreatedClasses(CreatedClasses);
    localStorage.setItem('CreatedClasses', JSON.stringify(CreatedClasses));
  };

  const clearError = () => {
    setError(null);
  };

  const clearCreatedClasses = () => {
    setCreatedClasses([]);
    localStorage.removeItem('CreatedClasses');
  };


  const value={
    error, setError, createdClasses, setCreatedClasses, clearError, setCreatedClassesAndStore, clearCreatedClasses
  };

  return (
    <createdClassesContext.Provider value={value}>
      {children}
    </createdClassesContext.Provider>
  )
}