import React from 'react';
import { Avatar } from '@mui/material';

const ClassPage = ({classData}) => {

  const { Class_name, Class_code, Section, Subject, Owner_email, Description } = classData;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <div className="main mx-2">
    <div className="mx-auto flex flex-col w-full md:w-[calc(100%-2*1.5rem)] max-w-[62.5rem]">
      <div className="bg-blue-600 rounded-lg mt-6 overflow-hidden">
        <div className="relative h-60 w-full">
          <div className="absolute top-0 left-0 w-full h-full bg-cover" style={{ backgroundImage: 'url(https://gstatic.com/classroom/themes/img_backtoschool.jpg)' }}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-transparent to-transparent opacity-80"/>
          </div>
          <div className="relative p-6">
            <h1 className="font-sans font-medium text-xl text-white leading-2.75xl truncate">
              {Class_name}
            </h1>
            <div className="font-sans text-base font-normal leading-base truncate text-white">
              {Section}
            </div>
            <div className="font-sans  leading-base text-white w-[60%]">
              {truncateText(Description, 140)}
            </div>
            <div className="flex flex-wrap items-center mt-2 text-white">
              { Class_code && <em className="font-medium">Class Code : {Class_code}</em>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex  mt-4">
          <div className="border border-gray-300 p-5 rounded-lg w-[220px]">
            <p>Upcoming</p>
            <p className="mt-6 text-gray-600 font-normal">No work due</p>
          </div>
          <div className="p-4 overflow-hidden -mt-9 ml-4 w-[100%]">
            <div className="shadow-md rounded-lg overflow-hidden min-h-18 mb-6 mt-6">
              <div className="p-12 w-70 text-gray-600">
                  <div
                    className="flex items-center cursor-pointer space-x-5"
                  >
                    <Avatar />
                    <div>Announce Something to class</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default ClassPage;