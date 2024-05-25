import React, { useState } from 'react';
import { TextField, Button, DialogActions } from '@mui/material';
import { useCreateClassPost } from '../../hooks/use-createClass-post';
import { useUserContext } from '../../Context/userContext';
import { useCreatedClassesContext } from '../../Context/classContext';
import { useClassContext } from '../../Context/context';
import { useNavigate } from 'react-router';

const Form = () => {

  const [ className, setClassName ] = useState(null);
  const [ subject, setSubject ] = useState(null);
  const [ section, setSection ] = useState(null);
  const [ description, setDescription] = useState(null);

  const url = "http://localhost/Classroom/CreateClass/CreateClass.php";

  const { postData } = useCreateClassPost();
  const { user } = useUserContext();
  const { error } = useCreatedClassesContext();
  const { setCreateClassDialog } = useClassContext();
  const navigate = useNavigate();

      
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let fData = {
      Class_name: className,
      Section: section,
      Subject: subject,
      Description: description,
      Owner_email: user.Email
    }
    const success = await postData(url, fData);

    if(success){
      setCreateClassDialog(false);
      navigate('/');
    } 
  
  };

  return (
    <form className='m-5' onSubmit={handleSubmit}>
      <p className="text-lg font-bold">Create Class</p>
      <TextField
        variant='filled'
        label="Class Name (required) *"
        name="className"
        fullWidth
        margin="normal"
        onChange={(e) => setClassName(e.target.value)}
        value={className}
        error={error && error.Class_name}
        helperText={error && error.Class_name && error.Class_name}
      />
      <TextField
        variant='filled'
        label="Section  (requried) *"
        name="section"
        fullWidth
        margin="normal"
        onChange={(e) => setSection(e.target.value)}
        value={section}
        error={error && error.Section}
        helperText={error && error.Section && error.Section}
      />
      <TextField
        variant='filled'
        label="Subject (requried) *"
        name="subject"
        fullWidth
        margin="normal"
        onChange={(e) => setSubject(e.target.value)}
        value={subject}
        error={error && error.Subject}
        helperText={error && error.Subject && error.Subject}
        
      />
      <textarea 
        minRows="3" 
        placeholder='Description' 
        className='w-full bg-slate-100 border-b-2 rounded-t-lg p-2 mt-2'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        >
      </textarea>
      <DialogActions>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </DialogActions>
  </form>
  )
}

export default Form