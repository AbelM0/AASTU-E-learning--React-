import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CreateClass, JoinClass, ProfileDialog, SearchBar } from "..";
import { useClassContext } from '../../Context/context'; 
import { useLocation } from 'react-router';


export default function Header({children}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {setCreateClassDialog, setJoinClassDialog, setProfileDialog } = useClassContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-white text-black">
          <div className='hidden md:block'>
            {children}
          </div>
          <Typography variant="h6" component="div" className="cursor-pointer hidden sm:block" sx={{ flexGrow: 1 }}>
            AASTU E-learning
          </Typography>
          {isHomePage && <SearchBar />}
          
          <IconButton color="inherit" onClick={handleClick}>
            <AddIcon  />
          </IconButton>
          <IconButton color="inherit">
            <AppsIcon/>
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }} 
          >
            <MenuItem onClick={() => {
              handleClose();
              setJoinClassDialog(true);
              }}>
              Join Class
            </MenuItem>

            <MenuItem onClick={() => {
                handleClose();
                setCreateClassDialog(true);
            }}>
              Create Class
            </MenuItem>
          </Menu>

          <div className='ml-3 cursor-pointer' onClick={() => {
              setProfileDialog(true);
            }}>
            <Avatar />
          </div>

        </Toolbar>
      </AppBar>
      <CreateClass />
      <JoinClass />
      <ProfileDialog />
    </Box>
  );
}
