import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button , Box} from '@mui/material';
import { makeStyles } from '@mui/styles';
import useAuth from '../../hooks/useAuth';
import NotificationBadge from '../Notification/Notification';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  selectedButton: {
    backgroundColor: '#1565c0', // Color de fondo para el botón seleccionado
    color: 'white', // Color del texto para el botón seleccionado
  },
}));

const Navbar = ({ onLogout }) => {
  const classes = useStyles();
  const { userRole } = useAuth();
  const [selectedLink, setSelectedLink] = useState('/dashboard');
  const [notifications, setNotifications] = useState([
    'Evaluación pendiente UX/UI - sab 31 agosto - 2:00pm',
    'Evaluación pendiente Back end - sab 14 octubre - 4:00pm',
  ]);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <AppBar position="static">
      <Toolbar>
      <Box className={classes.title} >
          <Typography variant="h6">
            Sistema de Evaluacion
          </Typography>
          <NotificationBadge notifications={notifications} />
        </Box>
        <Link to="/dashboard" className={classes.link} onClick={() => handleLinkClick('/dashboard')}>
          <Button className={selectedLink === '/dashboard' ? classes.selectedButton : classes.link }>
            Dashboard
          </Button>
        </Link>
        <Link to="/employee-profile" className={classes.link} onClick={() => handleLinkClick('/employee-profile')}>
          <Button className={selectedLink === '/employee-profile' ? classes.selectedButton : classes.link}>
            Perfil del empleado
          </Button>
        </Link>
        <Link to="/evaluation-form" className={classes.link} onClick={() => handleLinkClick('/evaluation-form')}>
          <Button className={selectedLink === '/evaluation-form' ? classes.selectedButton : classes.link}>
            Formulario de evaluacion
          </Button>
        </Link>
        <Link to="/evaluation-results" className={classes.link} onClick={() => handleLinkClick('/evaluation-results')}>
          <Button className={selectedLink === '/evaluation-results' ? classes.selectedButton : classes.link}>
            Resultados de evaluacion
          </Button>
        </Link>
        {userRole === 'admin' && (
          <Link to="/administration" className={classes.link} onClick={() => handleLinkClick('/administration')}>
            <Button className={selectedLink === '/administration' ? classes.selectedButton : classes.link}>
              Administracion
            </Button>
          </Link>
        )}
        <Button color="inherit" onClick={onLogout}>
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
