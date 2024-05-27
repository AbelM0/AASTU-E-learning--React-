import { createContext, useState, useContext } from "react";

const AddContext = createContext();

export function useClassContext(){
  return useContext(AddContext);
}

export function ClassContextProvider({children}){
  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);
  const [profileDialog, setProfileDialog] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showClassEdit, setShowClassEdit] = useState(false);

  const value={
    createClassDialog, 
    setCreateClassDialog, 
    joinClassDialog, 
    setJoinClassDialog,
    profileDialog,
    setProfileDialog,
    showDeleteWarning,
    setShowDeleteWarning,
    showClassEdit,
    setShowClassEdit
  };

  return (
    <AddContext.Provider value={value}>
      {children}
    </AddContext.Provider>
  )
}