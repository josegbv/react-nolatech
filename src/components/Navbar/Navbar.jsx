import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import useAuth from '../../hooks/useAuth';
import NotificationBadge from '../Notification/Notification';

// Estilos personalizados
const useStyles = makeStyles(() => ({
  link: {
    color: 'white', // Mantiene las letras blancas
    textDecoration: 'none',
  },
  button: {
    color: 'white', // Letras blancas por defecto
    '&:hover': {
      backgroundColor: '#135a9e', // Color de fondo al pasar el cursor
    },
  },
  selectedButton: {
    backgroundColor: '#135a9e', // Fondo azul oscuro para el botón seleccionado
    color: 'white', // Mantiene las letras blancas
    '&:hover': {
      backgroundColor: '#104a8c', // Fondo más oscuro al pasar el cursor sobre el botón seleccionado
    },
  },
}));

const Navbar = ({ onLogout }) => {
  const classes = useStyles();
  const { userRole } = useAuth();
  const [selectedLink, setSelectedLink] = useState('/dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    setDrawerOpen(false); // Cierra el drawer al seleccionar un link
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderMenuItems = () => (
    <List>
      <ListItem button component={Link} to="/dashboard" onClick={() => handleLinkClick('/dashboard')}>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/employee-profile" onClick={() => handleLinkClick('/employee-profile')}>
        <ListItemText primary="Perfil del empleado" />
      </ListItem>
      <ListItem button component={Link} to="/evaluation-form" onClick={() => handleLinkClick('/evaluation-form')}>
        <ListItemText primary="Formulario de evaluación" />
      </ListItem>
      <ListItem button component={Link} to="/evaluation-results" onClick={() => handleLinkClick('/evaluation-results')}>
        <ListItemText primary="Resultados de evaluación" />
      </ListItem>
      {userRole === 'admin' && (
        <ListItem button component={Link} to="/administration" onClick={() => handleLinkClick('/administration')}>
          <ListItemText primary="Administración" />
        </ListItem>
      )}
      <Divider />
      <ListItem button onClick={onLogout}>
        <ListItemText primary="Salir" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Icono de menú para pantallas pequeñas */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', sm: 'none' } }} // Muestra el ícono de menú solo en pantallas pequeñas
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sistema de Evaluación
        </Typography>

        <NotificationBadge notifications={['Notificación 1', 'Notificación 2']} />

        {/* Menú completo visible solo en pantallas grandes */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}> 
          <Link to="/dashboard" className={classes.link}>
            <Button
              className={`${classes.button} ${
                selectedLink === '/dashboard' ? classes.selectedButton : ''
              }`}
              onClick={() => handleLinkClick('/dashboard')}
            >
              Dashboard
            </Button>
          </Link>
          <Link to="/employee-profile" className={classes.link}>
            <Button
              className={`${classes.button} ${
                selectedLink === '/employee-profile' ? classes.selectedButton : ''
              }`}
              onClick={() => handleLinkClick('/employee-profile')}
            >
              Perfil del empleado
            </Button>
          </Link>
          <Link to="/evaluation-form" className={classes.link}>
            <Button
              className={`${classes.button} ${
                selectedLink === '/evaluation-form' ? classes.selectedButton : ''
              }`}
              onClick={() => handleLinkClick('/evaluation-form')}
            >
              Formulario de evaluación
            </Button>
          </Link>
          <Link to="/evaluation-results" className={classes.link}>
            <Button
              className={`${classes.button} ${
                selectedLink === '/evaluation-results' ? classes.selectedButton : ''
              }`}
              onClick={() => handleLinkClick('/evaluation-results')}
            >
              Resultados de evaluación
            </Button>
          </Link>
          {userRole === 'admin' && (
            <Link to="/administration" className={classes.link}>
              <Button
                className={`${classes.button} ${
                  selectedLink === '/administration' ? classes.selectedButton : ''
                }`}
                onClick={() => handleLinkClick('/administration')}
              >
                Administración
              </Button>
            </Link>
          )}
          <Button color="inherit" onClick={onLogout}>
            Salir
          </Button>
        </Box>
      </Toolbar>

      {/* Drawer que aparece en pantallas pequeñas */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderMenuItems()}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
