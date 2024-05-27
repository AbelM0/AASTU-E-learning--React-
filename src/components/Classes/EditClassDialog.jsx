import React, { useState } from 'react';
import { Dialog, Slide, TextField, Button, Avatar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useUserContext } from '../../Context/userContext';
import { useClassContext } from "../../Context/context";
import { useClassPatch } from '../../hooks/use-class-patch';
import { useCreatedClassesContext } from '../../Context/classContext';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditClassDialog = ({classData}) => {


  const { Class_name, Class_code, Section, Subject, Owner_email, Description, id } = classData;

  const { user } = useUserContext();
  const { error } = useCreatedClassesContext();

  const {showClassEdit, setShowClassEdit} = useClassContext();
  const [className, setClassName] = useState(Class_name);
  const [section, setSection] = useState(Section);
  const [description, setDescription] = useState(Description);


  const { patchData } = useClassPatch();

  const url = "http://localhost/Classroom/UpdateClass/UpdateClass.php";

  const handleClassNameSubmit = async (e) => {
    e.preventDefault();

    let fData = {
      Class_name: className,
      Email: user.Email,
      Id:id,
      Updating: "Class_name"
    }

   patchData(url, fData);
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();

    let fData = {
      Section: section,
      Email: user.Email,
      Id:id,
      Updating: "Section"
    }

     patchData(url, fData);
  };

  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();

    let fData = {
      Description: description,
      Email: user.Email,
      Id:id,
      Updating: "Description"
    }

   patchData(url, fData);

  };

  return (
    <Dialog
      fullScreen
      open={showClassEdit} 
      onClose={() => setShowClassEdit(false)} 
      TransitionComponent={Transition}
    >
      <div className="font-roboto text-sm font-normal tracking-[0.2px] leading-5 px-6 flex-grow flex flex-col items-center">
        <div className="flex justify-between border-b border-[#e0e0e0] py-2 px-4 w-[98vw]">
          <div className="h-12 text-[#5f6368] fill-current flex items-center">
            <CloseIcon onClick={() => setShowClassEdit(false)} className="cursor-pointer hover:bg-gray-100 rounded-xl transition-all" />
            <div className="font-google-sans text-[1.375rem] font-normal leading-7 text-[#80868b] ml-4">Edit Class</div>
          </div>
        </div>                      
          <div className="mt-4 max-w-[40rem] box-border p-6 w-full bg-white border border-[#dadce0] rounded-lg overflow-hidden flex flex-col justify-center">
            <p className="text-[#7f7f7f] text-s mb-4">
              Update your Class Info:
            </p>
            <div method='post' className='flex flex-col justify-center space-y-4'>
            <p className="text-[#7f7f7f] text-xs ">
              Update your Class Name:
            </p>
            <form method='patch' onSubmit={handleClassNameSubmit} className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between w-[30rem]'>
              <TextField
                label="Class Name"
                variant="outlined"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="mx-4 w-[70%]"
                error={error && error.Class_name}
                helperText={error && error.Class_name}
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
              Update Section:
            </p>
            <form method="patch" onSubmit={handleSectionSubmit} className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between w-[30rem]'>
              <TextField
                label="Section"
                variant="outlined"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="mb-4 w-[70%]"
                error={error && error.Section}
                helperText={error && error.Section}
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
              Update Desciption:
            </p>
            <form method='patch' onSubmit={handleDescriptionSubmit} className='flex flex-col space-y-2 space-x-4 sm:space-y-0 sm:flex-row justify-between w-[30rem]'>
            <textarea 
              minRows="3" 
              placeholder='Description' 
              className='w-full bg-slate-100 border-b-2 rounded-t-lg p-2 mt-2'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={6}
              >
            </textarea>                

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

export default EditClassDialog;
