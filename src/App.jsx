import React, { useEffect} from 'react'
import { Drawer, Login, Signup, Class } from "./components";
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { useCreatedClassesContext } from './Context/classContext';
import { useJoinedClassesContext } from './Context/joinedClassContext';

function App() {

  const { createdClasses } = useCreatedClassesContext();
  const { joinedClasses } = useJoinedClassesContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
          
              {joinedClasses.map((classData) => (
                <Route
                  key={classData.id}
                  path={`/class/${classData.id}`}
                  element={<Class classData={classData} />}
                />
              ))}


              {createdClasses.map((classData) => (
                <Route
                  key={classData.id}
                  path={`/class/${classData.id}`}
                  element={<Class classData={classData} />}
                />
              ))}
            <Route path='/' element={<Drawer />} />
            <Route path='/login' element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  )
}

export default App;


