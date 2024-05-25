import React, { useState } from 'react'
import { useClassContext } from '../../Context/context';
import { Avatar, Button, Dialog, Slide, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useUserContext } from '../../Context/userContext';
import { useNavigate } from 'react-router';
import { useJoinedClassesContext } from '../../Context/joinedClassContext';
import { useCreatedClassesContext } from '../../Context/classContext';
import { useJoinedClassPost } from '../../hooks/use-joinClass-post';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const JoinClass = () => {

  const {joinClassDialog, setJoinClassDialog } = useClassContext();
  const { user, clearUser } = useUserContext();
  const navigate = useNavigate();

  const [classCode, setClassCode] = useState("");
  const [email, setEmail] = useState("");
  const { clearJoinedClasses, error } = useJoinedClassesContext();
  const { clearCreatedClasses } = useCreatedClassesContext();

  const { postData } = useJoinedClassPost();

  const url = "http://localhost/Classroom/JoinClass/JoinClass.php";



  const handleSubmit = async (e) => {
    e.preventDefault();

    const fData = {
      Class_code: classCode,
      Owner_email: email,
      Email: user.Email
    }

    const success = await postData(url, fData);

    if(success){
      setCreateClassDialog(false);
      navigate(window.location.pathname, { replace: true });
      window.location.reload();
    } 
  }

  return ( 
    <>
      <Dialog 
        fullScreen
        open={joinClassDialog}
        onClose={ () => setJoinClassDialog(false) }
        TransitionComponent={Transition}
        >
          <div className="font-roboto text-sm font-normal tracking-[0.2px] leading-5 px-6 flex-grow flex flex-col items-center">
          <div className="flex justify-between border-b border-[#e0e0e0] py-2 px-4 w-[98vw]">
            <div
              className="h-12 text-[#5f6368] fill-current flex items-center"
            
            >
              <CloseIcon onClick={() => setJoinClassDialog(false)} className="cursor-pointer hover:bg-gray-100 rounded-xl transition-all" />
              <div className="font-google-sans text-[1.375rem] font-normal leading-7 text-[#80868b] ml-4">Join Class</div>
            </div>
            <Button
              className="w-[40px] h-[40px]"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Join
            </Button>
          </div>
          <div className="mt-4 max-w-[35rem] box-border p-6 w-full bg-white border border-[#dadce0] rounded-lg overflow-hidden flex flex-col justify-center">
            <p className="text-[#7f7f7f] text-xs mb-2">
              You're currently signed in as {user && user.Email ? user.Email : "Email"}
            </p>
            <div className="flex items-center flex-wrap w-full justify-between">
              <div className="flex">
                <Avatar />
                <div className="ml-4 w-[80%]">
                  <div className="tracking-[0.01785714em] font-google-sans text-sm font-medium leading-[1.25rem] text-[#3c4043] truncate">
                    {user && user.First_name ? user.First_name : "Name"}
                  </div>
                  <div className="tracking-[0.025em] font-roboto text-xs font-normal leading-[1rem] text-[#5f6368] truncate">
                  {user && user.Email ? user.Email : "Email"}
                  </div>
                </div>
              </div>
              <Button
               onClick={() => {
                clearUser();
                setJoinClassDialog(false)
                navigate("/login");
                clearCreatedClasses();
                clearJoinedClasses();
               }}
               variant="outlined" 
               color="primary"
               >
                Logout
              </Button>
            </div>
          </div>
          <div className="mt-4 max-w-[35rem] box-border p-6 w-full bg-white border border-[#dadce0] rounded-lg overflow-hidden flex flex-col justify-center">
            <div
              style={{ fontSize: "1.25rem", color: "#3c4043" }}
              className="text-[#7f7f7f] text-xs mb-4"
            >
              Class Code
            </div>
            <div
              style={{ color: "#3c4043", marginTop: "-5px" }}
              className="text-[#7f7f7f] text-xs mb-4"
            >
              Ask your teacher for the class code, then enter it here.
            </div>
            <div className="flex items-center flex-wrap w-full justify-between">
              <TextField
                className="sm:mb-1 md:mb-0"
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error && error.Class_code}
                helperText={error && error.Class_code && error.Class_code}
              />
              <TextField
                id="outlined-basic"
                label="Owner's email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error && error.Owner_email}
                helperText={error && error.Owner_email && error.Owner_email}
              />
              
            </div>
          </div> 
        </div>
      </Dialog>
    </>
  )
}

export default JoinClass;