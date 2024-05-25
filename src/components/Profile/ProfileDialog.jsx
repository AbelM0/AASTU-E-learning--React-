import React, { useState } from 'react';
import { Dialog, Slide, TextField, Button, Avatar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useUserContext } from '../../Context/userContext';
import { useClassContext } from "../../Context/context";
import { useNavigate } from 'react-router';
import DeleteWarning from './DeleteWarning';
import { usePatch } from '../../hooks/use-patch';
import { useCreatedClassesContext } from '../../Context/classContext';
import { useJoinedClassesContext } from '../../Context/joinedClassContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileDialog = () => {
  const { user, error, clearUser } = useUserContext();
  const {profileDialog, setProfileDialog, setShowDeleteWarning } = useClassContext();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user ? user.First_name : '');
  const [lastName, setLastName] = useState(user ? user.Last_name : '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { clearCreatedClasses } = useCreatedClassesContext();
  const { clearJoinedClasses } = useJoinedClassesContext();

  const { patchData } = usePatch();

  const url = "http://localhost/Classroom/Profile/UpdateProfile.php";

  const handleFirstNameSubmit = async (e) => {
    e.preventDefault();

    let fData = {
      First_name: firstName,
      Email: user.Email,
      Updating: "First_name"
    }

   patchData(url, fData);
  };

  const handleLastNameSubmit = async (e) => {
    e.preventDefault();

    let fData = {
      Last_name: lastName,
      Email: user.Email,
      Updating: "Last_name"
    }

     patchData(url, fData);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    let fData = {
      New_password: newPassword,
      Current_password: currentPassword,
      Email: user.Email,
      Updating: "Password"
    }

   patchData(url, fData);

  };


  const handleDeleteAccount = () => {
    setShowDeleteWarning(true)
  };

  function handleNewPasswordError(){
    if(error.New_password == "Password is required"){
      return error.New_password;
    } else {
      let x = "";
      let array = error.New_password;
      array.forEach((e) => {
        x = x + e + " ";
      })
      return x;
    }
  }

  function handleCurrentPasswordError(){
    if(error.Current_password == "Password is required" || error.Current_password == "Incorrect password."){
      return error.Current_password;
    } else {
      let x = "";
      let array = error.Current_password;
      array.forEach((e) => {
        x = x + e + " ";
      })
      return x;
    }
  }
  return (
    <Dialog
      fullScreen
      open={profileDialog} 
      onClose={() => setProfileDialog(false)} 
      TransitionComponent={Transition}
    >
    <DeleteWarning />
      <div className="font-roboto text-sm font-normal tracking-[0.2px] leading-5 px-6 flex-grow flex flex-col items-center">
        <div className="flex justify-between border-b border-[#e0e0e0] py-2 px-4 w-[98vw]">
          <div className="h-12 text-[#5f6368] fill-current flex items-center">
            <CloseIcon onClick={() => setProfileDialog(false)} className="cursor-pointer hover:bg-gray-100 rounded-xl transition-all" />
            <div className="font-google-sans text-[1.375rem] font-normal leading-7 text-[#80868b] ml-4">Profile</div>
          </div>
        </div> 
        <div className="mt-4 max-w-[40rem] box-border p-6 w-full bg-white border border-[#dadce0] rounded-lg overflow-hidden flex flex-col justify-center">
            <p className="text-[#7f7f7f] text-xs mb-2">
              You're currently signed in as {user && user.Email ? user.Email : "Email"}
            </p>
            <div className="flex items-center flex-wrap w-full justify-between">
              <div className="flex">
                <Avatar />
                <div className="ml-4 w-[80%]">
                  <div className="tracking-[0.01785714em] font-google-sans text-sm font-medium leading-[1.25rem] text-[#3c4043] truncate">
                    {user && user.First_name ? user.First_name : "FName"} {user && user.Last_name}
                  </div>
                  <div className="tracking-[0.025em] font-roboto text-xs font-normal leading-[1rem] text-[#5f6368] truncate">
                  {user && user.Email ? user.Email : "Email"}
                  </div>
                </div>
              </div>
              <div className='mt-3 sm:mt-0 space-x-3'>
              
                <Button
                  onClick={handleDeleteAccount}
                  variant="outlined"
                  color="error"
                >
                  Delete Account
                </Button>

                <Button
                onClick={() => {
                  clearCreatedClasses();
                  clearJoinedClasses();
                  clearUser();
                  setProfileDialog(false)
                  navigate("/login")
                }}
                variant="outlined" 
                color="primary"
                >
                  Logout
                </Button>
                
              </div>

            </div>
          </div>                      
          <div className="mt-4 max-w-[40rem] box-border p-6 w-full bg-white border border-[#dadce0] rounded-lg overflow-hidden flex flex-col justify-center">
            <p className="text-[#7f7f7f] text-s mb-4">
              Update your profile:
            </p>
            <div method='post' className='flex flex-col justify-center space-y-4'>
            <p className="text-[#7f7f7f] text-xs ">
              Update your First Name:
            </p>
            <form method='patch' onSubmit={handleFirstNameSubmit} className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between w-[30rem]'>
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mx-4 w-[70%]"
                error={error && error.First_name}
                helperText={error && error.First_name && error.First_name}
              />
               <Button
                  className="w-[20%] h-[70%] sm:self-center"
                  variant="outlined"
                  color="success"
                  type='submit'
                >
                  Update
                </Button>            
            </form>
            <p className="text-[#7f7f7f] text-xs ">
              Update your Last Name:
            </p>
            <form method="patch" onSubmit={handleLastNameSubmit} className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between w-[30rem]'>
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mb-4 w-[70%]"
                error={error && error.Last_name}
                helperText={error && error.Last_name && error.Last_name}
              />  
              <Button
                className="w-[20%] h-[70%] sm:self-center"
                variant="outlined"
                color="success"
                type='submit'
              >
                Update
              </Button>            
            </form>
            <p className="text-[#7f7f7f] text-xs ">
              Update your Password:
            </p>
            <form method='patch' onSubmit={handlePasswordSubmit} className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between w-[30rem]'>
              <div className='space-y-2 w-[30rem]'>
                <TextField
                  label="Current Password *"
                  variant="outlined"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mb-4 w-[70%]"
                  error={error && error.Current_password}
                  helperText={error && error.Current_password && handleCurrentPasswordError()}
                />  
                <TextField
                  label="New Password"
                  variant="outlined"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mb-4 w-[70%]"
                  error={error && error.New_password}
                  helperText={error && error.New_password && handleNewPasswordError()}
                />                 
              </div>
              <Button
                className="w-[20%] h-[40%] sm:self-center"
                variant="outlined"
                color="success"
                type='submit'
              >
                Update
              </Button>
            </form>
            
            </div>
                
          </div>
        </div>
    </Dialog>
  );
};

export default ProfileDialog;
