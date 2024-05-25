import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button } from '@mui/material';
import { ClassesCard, Header, AltClassesCard } from '..';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserContext } from '../../Context/userContext';
import { useNavigate } from 'react-router';
import { useCreateClassGet } from '../../hooks/use-createdClasses-get';
import { useJoinedClassGet } from '../../hooks/use-joinedClasees-get';
import { useCreatedClassesContext } from '../../Context/classContext';
import { useJoinedClassesContext } from '../../Context/joinedClassContext';
import { useLocation } from 'react-router';


export default function SwipeableTemporaryDrawer() {

  const { user } = useUserContext();
  const navigate = useNavigate();

  const {getData} = useCreateClassGet();
  const {getJoinedData} = useJoinedClassGet();

  const { createdClasses } = useCreatedClassesContext();
  const { joinedClasses } = useJoinedClassesContext();

  const url = "http://localhost/Classroom/DisplayClasses/DisplayCreatedClasses.php";
  const JoinedUrl = "http://localhost/Classroom/DisplayClasses/DisplayJoinedClass.php";

  React.useEffect(() => {

    const fetchData = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      const params = {
        Email: user.Email,
      };

      const idParams = {
        id: user.id,
      };

      const joinedSuccess = await getJoinedData(JoinedUrl, idParams);

      const success = await getData(url, params);
    };

    fetchData();
  }, [])

  const [variant1, setVarinat1] = React.useState("outlined");
  const [variant2, setVarinat2] = React.useState("text");
  const [variant3, setVarinat3] = React.useState("text");

  const [classes, setClasses] = React.useState(createdClasses.concat(joinedClasses));


  const [state, setState] = React.useState({
    top: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const location = useLocation();
  const isHomePage = location.pathname === '/';


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        <Header>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
          </IconButton>
        </Header> 
        
        {isHomePage && 
          <div>
            <div className='flex justify-center my-6 space-x-4'>
              <Button variant={variant1} onClick={() => {
                setVarinat1("outlined");
                setVarinat2("text");
                setVarinat3("text");
                setClasses(createdClasses.concat(joinedClasses))
              }}>
                All
              </Button>
              <Button variant={variant2} onClick={() => {
                setVarinat1("text");
                setVarinat2("outlined");
                setVarinat3("text");
                setClasses(joinedClasses)
              }}>
                Joined
              </Button>
              <Button variant={variant3}onClick={() => {
                setVarinat1("text");
                setVarinat2("text");
                setVarinat3("outlined");
                setClasses(createdClasses)
              }}>
                Created
              </Button>
            </div>

          
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[80rem] lg:mx-auto mx-5">
              {classes.map((classData, index) => (
                  <div key={index}>
                    <AltClassesCard classData={classData} />
                  </div>
              ))}
            </div>
          </div>
            }
          

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}