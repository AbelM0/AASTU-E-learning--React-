import { Avatar } from '@mui/material';
import React from "react";
import { Link } from "react-router-dom";


const AltClassesCard = ({ classData }) => {

  const { Class_name, Class_code, Section, Subject, Owner_email, Description } = classData;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="flex justify-center">
      <li className="flex flex-col h-[16rem] mb-6 mr-6 overflow-hidden relative text-left w-[18.75rem] bg-white border border-[#dadce0] rounded-lg m-2 shadow-md hover:shadow-xl transition-shadow duration-200">
        <div className="">
          <div className="relative">
            <div className="h-full left-0 absolute top-0 w-full bg-[#174ea6]" />
            <div className="absolute inset-0 bg-cover bg-no-repeat"
              style={{backgroundImage: `url('https://gstatic.com/classroom/themes/Physics.jpg')`,}}/>
            <div className="flex flex-col justify-between h-18 px-4 pt-4 relative">
              <Link className="flex flex-col justify-between h-18 pb-6 pt-4 relative text-white font-roboto" to={`/class/${classData.id}`}>
                <h2 className="text-lg hover:underline">
                {truncateText(Class_name, 25)}
                </h2>
              </Link>
              <div className='float-right'>
                <p className="text-white">{Owner_email}</p>
                <Avatar
                  className="float-right h-18 relative -mt-12 w-18 text-left m-2"
                />
              </div>
              
            </div>
          </div>
          
        </div>
        <div>

        </div>
        <div className='p-2'>
           {truncateText(Description, 150)}
        </div>

      </li>
    </div>

  );
};

export default AltClassesCard;