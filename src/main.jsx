import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClassContextProvider } from './Context/context.jsx';
import { UserContextProvider } from './Context/userContext.jsx';
import { CreatedClassesContextProvider } from './Context/classContext.jsx';
import { JoinedClassesContextProvider } from './Context/joinedClassContext.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <CreatedClassesContextProvider>
      <JoinedClassesContextProvider>
        <UserContextProvider>
          <ClassContextProvider>
            <App />
          </ClassContextProvider>
        </UserContextProvider>
      </JoinedClassesContextProvider>
    </CreatedClassesContextProvider>
  </QueryClientProvider>
</React.StrictMode>
  
)
