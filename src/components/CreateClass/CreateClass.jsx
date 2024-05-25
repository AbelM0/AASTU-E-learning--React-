import React, { useState } from 'react'
import { useClassContext } from '../../Context/context'
import Dialog from '@mui/material/Dialog';
import { DialogContent, Checkbox, DialogActions, Button } from '@mui/material';
import Form from './Form';

const CreateClass = () => {
  const [check, setChecked] = useState(false);
  const {createClassDialog, setCreateClassDialog} = useClassContext();
  const [showForm, setShowForm] = useState(false);

 
  return (
    <div>
      <Dialog
        open={createClassDialog}
        onClose={ () => {
          setCreateClassDialog(false);
          setShowForm(false);
          setChecked(false);
          handleClose}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

      {showForm ? ( <Form /> ) : (
        <>
          <div className='font-open-sans text-base font-bold tracking-[0.1px] leading-6 flex-grow flex-shrink mx-6 mt-4 mb-3 min-w-0'>
            Using Classroom at a school with Students?
          </div>
          <DialogContent>
            <p className="mb-[10px]">
              <p>If so, your school must sign up for a free</p>
              <a href="/help" className="text-[#4285f4] no-underline cursor-pointer mr-1">
                AASTU E-learning
              </a>
              account before you can use Classroom
              <a href="/learn" className="text-[#4285f4] no-underline cursor-pointer ml-1">
                Learn More.
              </a>
            </p>
            <p>
              ASSTU E-learning lets schools decide which Google services
              their students can use, and provides additional
              <a href="/privacy" className="text-[#4285f4] no-underline cursor-pointer mx-1">
                privacy and security 
              </a>
              protections that are important in a school setting. Students
              cannot use Google Classroom at a school with personal accounts.
            </p>

            <div className="bg-[#f5f5f5] flex mt-6 overflow-hidden p-4">
              <Checkbox color="primary" onChange={() => setChecked(!check)} />
              <p>
                I've read and understand the above notice, and I'm not using
                Classroom at a school with students
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => {
              setCreateClassDialog(false);
              setChecked(false);
              setShowForm(false);
              }}>
              Close
            </Button>
            <Button autoFocus disabled={!check} onClick={() => setShowForm(true)}>
              Continue
            </Button>
          </DialogActions>
        </>
      )}
        
      </Dialog>      
    </div>
  )
}

export default CreateClass