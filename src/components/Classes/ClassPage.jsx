import React, { useState, useEffect } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';
import { useUserContext } from '../../Context/userContext';
import Announcement from '../AnnouncementCard/AnnouncementCard';

const ClassPage = ({classData}) => {

  const { Class_name, Class_code, Section, Subject, Owner_email, Description, id } = classData;

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [ error, setError ] = useState(null);
  const [ announcements, setAnnouncements ] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      
      const params = {
        classId: id
      };

     const getUrl = "http://localhost/Classroom/DisplayAnnouncements/DisplayAnnouncements.php";

       try {
        
        const res = await axios.get(getUrl, { params });

          if(res.data.error == "None"){
            setAnnouncements(res.data.announcements);
            setError(null);
            return true;
          } else {
            setError(res.data.error);
            return false;
          }
          

      } catch (error) {
        console.error(error);
      } 
    };

    fetchData();
  }, [])

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {

    const fileUrl = "http://localhost/Classroom/Upload/upload.php";
    const AnnouncementUrl = "http://localhost/Classroom/CreateAnnouncement/CreateAnnouncement.php";

    if(!file && inputValue == ""){
      setError("You should upload a file or write a text to post an announcement.");
    } else {
      setError(null);

      let uploadedFileId = null;
      let uploadedFileName = null;
      let uploadedFileType = null;

      if (file) {
        
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await axios.post(fileUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          uploadedFileId = response.data.fileId;
          uploadedFileName = response.data.fileName;
          uploadedFileType = response.data.fileType;

        } catch (error) {
          alert("An error occurred while uploading the file." + error);
        }
      } 

      const AnnouncementData = {
        message: inputValue,
        fileId: uploadedFileId,
        fileName: uploadedFileName,
        fileType: uploadedFileType,
        classId: id,
        Email: user.Email
      }

      const response = await axios.post(AnnouncementUrl, AnnouncementData);
      setAnnouncements(response.data.announcements);
    }
  };

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
          <div className="border border-gray-300 p-5 rounded-lg w-[220px] h-[200px]">
            <p>Upcoming</p>
            <p className="mt-6 text-gray-600 font-normal">No work due</p>
          </div>
          <div className="p-4 overflow-hidden -mt-9 ml-4 w-[100%]">
            <div className="shadow-md rounded-lg overflow-hidden min-h-18 mb-6 mt-6">
              <div className="p-12 w-70 text-gray-600">

                  {showInput ? (
                  <div className="flex flex-col items-start w-full">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline={true}
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      className='w-full'
                      onChange={(e) => setInput(e.target.value)}
                      rows="6"
                      error={error}
                      helperText={error}
                    />
                    <div className="flex justify-between w-full mt-5">
                      <div className="flex w-full items-center">
                          <label class="flex space-x-3 items-center px-4 py-[6px] bg-white text-blue rounded-[5px] tracking-wide uppercase border border-blue-400 cursor-pointer hover:border-blue-600 transition-all duration-200">
                              <CloudUpload className='text-blue-500'/>
                              <span class="leading-normal font-medium text-blue-500">Upload a file</span>
                              <input type='file' name='file' onChange={handleChange} className="hidden" />
                          </label>
                      </div>

                      <div>
                        <Stack direction="row" spacing={2}>
                          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowInput(false)}>
                            Cancel
                          </Button>
                          <Button variant="contained" endIcon={<SendIcon />} onClick={handleUpload}>
                            Post
                          </Button>
                        </Stack>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center cursor-pointer main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar className='mr-5'/>
                    <div className='mr-5'>Announce Something to class</div>
                  </div>
                )}
              </div>
            </div>
            {announcements.map((announcement, index) => (
              <Announcement key={index} announcementData ={announcement} />
            ))}
          </div>
        </div>
    </div>
  </div>
  )
}

export default ClassPage;