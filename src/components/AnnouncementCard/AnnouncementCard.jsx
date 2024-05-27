import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

const Announcement = ({ announcementData  }) => {

  const {announcerEmail, fileName, fileType, message} = announcementData ;

  const fileUrl = `C:\.xampp\.htdocs\.Classroom\.Upload\.uploads\.${fileName}`;
  
  return (
    <div>
       <div className="bg-white border border-gray-300 rounded-md overflow-hidden mb-6">
          <div className="flex-1 p-2">
            <div className="flex items-center space-x-4 pb-4">
              <Avatar />
              <div>{announcerEmail}</div>
            </div>
            <p className="space-y-2 ml-5 mb-4">{message}</p>
            {fileType.startsWith('image') ? (
              <img className="h-36 w-36 object-contain ml-4" src="C:\xampp\htdocs\Classroom\Upload\uploads\Harold.jpg" alt={fileName} />
            ) : (
              <div className="h-36 w-36 flex items-center justify-center ml-4 bg-gray-200 text-gray-400">
                File: {fileName}
                <a href={fileUrl} />
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Announcement;
