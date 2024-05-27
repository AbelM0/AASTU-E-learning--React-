import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useJoinedClassPost } from '../../hooks/use-joinClass-post';
import { useUserContext } from '../../Context/userContext';
import { useJoinedClassesContext } from '../../Context/joinedClassContext';
import CloseIcon from '@mui/icons-material/Close';


const SearchBar = () => {

  const [ input, setInput] = useState("");
  const [classes, setClasses] = useState([]);
  const Url = `http://localhost/Classroom/SearchClass/SearchClass.php`
  const { postData } = useJoinedClassPost();
  const { user } = useUserContext();
  const { error, setError } = useJoinedClassesContext();
 

  async function handleSubmit(e) {
    e.preventDefault();

    const params = {
      Class_name: input,
    };

    try {
      const response = await axios.get(Url, { params });
      if (response.data.error === 'None') {
        setClasses(response.data.data);
      } else {
        setClasses([]);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      setClasses([]);
    }
  }

  async function handleSearchClick(classCode, email){

    const url="http://localhost/Classroom/JoinClass/JoinClass.php";

    const fData = {
      Class_code: classCode,
      Owner_email: email,
      Email: user.Email
    }

    const success = await postData(url, fData);

    if(success){
      setClasses([]);
      setError(null);
    }
  }
  return (
    <div class="flex flex-1 items-center justify-center px-6" onSubmit={handleSubmit}>
      <div class="w-full max-w-lg">
        <form class="sm:flex sm:items-center">
        <input
            id="q"
            name="q"
            className="inline w-full sm:min-w-[200px] rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            placeholder="Class name"
            type='text'
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className='mx-2' type='button' onClick={() => {
            setClasses([]);
            setError(null);
            setInput("");
          }}><CloseIcon /></button>
            <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Search
          </button>
          
        </form>
        {error && error.Owner_email && <p className='text-red-500'>{error.Owner_email}</p>}
        {error && error.Class_code && <p className='text-red-500'>{error.Class_code}</p>}
        {classes.length > 0 && 
          <div className="flex flex-col bg-gray-100 text-left absolute z-10">
          {classes.map((item, index) => {
          return (
            <div
              className="px-8 border cursor-pointer"
              key={index}
              onClick={() => {
                  handleSearchClick(item.Class_code, item.Owner_email);
              }}>
              <p>{item.Class_name}</p>
              <p>{item.Owner_email}</p>
            </div>
          )
        })}
        </div>}
      </div>
    </div>

  )
}

export default SearchBar;