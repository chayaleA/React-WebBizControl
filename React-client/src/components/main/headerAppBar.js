import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import businessData from '../dataStores/businessData';

export default function HeaderAppBar({ isAdmin, setIsAdmin }) {
  const business = businessData.data;
  function handleLogout() {
    alert("Logout successfuly")
    setIsAdmin(false);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'hsl(0, 0%, 90%)', height: 80 }}>
        <Toolbar>
          <Box
            sx={{
              position: 'absolute',
              top: '8px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              right: '0.25%',
              "& img": {
                width: '20%',
                height: 'auto',
                display: 'block',
                margin: 'auto',
              },
            }
            }
          >
            <img src={business.logo} alt="Business Logo" />
          </Box>
          {isAdmin ?
            <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: '20px', marginTop: '11px' }}>
              <Button variant="outlined" onClick={handleLogout}>
                <Link to="/" component="button" underline="none" style={{ textDecoration: 'none', color: 'inherit' }}  >
                  {/* <IconButton color="inherit"> */}
                  Log out
                  <LogoutIcon fontSize="small" />
                  {/* </IconButton> */}
                </Link>
              </Button>
            </Typography> :
            <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: '20px', marginTop: '11px' }}>
              <Button variant="outlined">
                <Link to="/Login" underline="none" style={{ textDecoration: 'none', color: 'inherit' }}  >
                  Log in
                  <LoginIcon fontSize="small" />
                </Link>
              </Button>
            </Typography>
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: '20px', marginTop: '11px' }}>
            <Button variant="outlined">
              <Link to="/" underline="none" style={{ textDecoration: 'none', color: 'inherit' }} >
                Home
                <HomeIcon fontSize="small" />
              </Link>
            </Button>
          </Typography>

          {isAdmin && (<><Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: '20px', marginTop: '11px' }}>
            <Button variant="outlined">
              <Link to="/services" underline="none" style={{ textDecoration: 'none', color: 'inherit' }} >
                Services
                <BuildIcon fontSize="small" />
              </Link>
            </Button>
          </Typography> <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: '20px', marginTop: '11px' }}>
              <Button variant="outlined">
                <Link to="/meetings" underline="none" style={{ textDecoration: 'none', color: 'inherit' }} >
                  Meetings
                  <PeopleIcon fontSize="small" />
                </Link>
              </Button>
            </Typography>
          </>)
          }
          {!isAdmin && <Typography variant="h6" component="div" sx={{
            ...(!isAdmin && { flexGrow: 0.77 })
            , color: 'black',
            textAlign: 'center',
            fontSize: '30px'
            , marginTop: '11px'
          }}>
            <strong>{business.name}</strong>
          </Typography>}
        </Toolbar>
      </AppBar>
    </Box >
  );
}

