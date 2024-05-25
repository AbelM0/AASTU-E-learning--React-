import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useClassContext } from '../../Context/context';
import { useUserContext } from '../../Context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useCreatedClassesContext } from '../../Context/classContext';
import { useJoinedClassesContext } from '../../Context/joinedClassContext';


export default function DeleteWarning() {
  const { showDeleteWarning, setShowDeleteWarning, setProfileDialog } = useClassContext();
  const { user, clearUser } = useUserContext();
  const navigate = useNavigate();
  const { clearCreatedClasses } = useCreatedClassesContext();
  const { clearJoinedClasses } = useJoinedClassesContext();

  const url = "http://localhost/Classroom/Profile/DeleteAccount.php";


  const handleClose = () => {
    setShowDeleteWarning(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { email: user.Email },
      });

      if (response.status === 200) {
        // Clear user data and redirect to signup page
        clearUser();
        clearCreatedClasses();
        clearJoinedClasses();
        setProfileDialog(false);
        navigate('/login');
      } else {
        // Handle error response from server
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      handleClose();
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={showDeleteWarning}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Once you delete your account, there is no getting it back. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>close</Button>
          <Button onClick={handleDelete} autoFocus color='error' variant='outlined'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}