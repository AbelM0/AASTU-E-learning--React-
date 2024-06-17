import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

const Announcement = ({ announcementData  }) => {

  const {announcerEmail, fileName, fileType, message, uploadDate} = announcementData ;

  const fileUrl = `C:\.xampp\.htdocs\.Classroom\.Upload\.uploads\.${fileName}`;

  const renderFile = () => {
    if (!fileName) {
      return null;
    }
  
    if (fileType.startsWith('image')) {
      return (
        <img className="h-36 w-36 object-contain ml-4" src={fileUrl} alt={fileName} />
      );
    } else {
      return (
        <div className="flex items-center justify-center ml-4 space-x-4 bg-gray-200 text-gray-400">
                  <p>{fileName}</p>
                  <a href={fileUrl}> <DownloadIcon /> </a>
      </div>
      );
    }
  };
  
  return (
    <div>
       <div className="bg-white border border-gray-300 rounded-md overflow-hidden mb-6">
          <div className="flex-1 p-2">
            <div className="flex items-center space-x-4 pb-4">
              <Avatar />
              <div>{announcerEmail}</div>
              <div className="text-[10px] text-gray-400">{uploadDate}</div>
            </div>
            <p className="space-y-2 ml-5 mb-4">{message}</p>
            {renderFile()}
            
          </div>
        </div>
    </div>
  );
};

export default Announcement;
