import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './Navbar.css';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: 'inherit',
      textDecoration: 'none'
    },
  }));

const Navbar = ({ onLogout }) => {
    const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
      
        <Typography variant="h6" className={classes.title}>
          Sistema de Evaluacion 
        </Typography>

        <Link to="/dashboard" className={classes.link}>
          <Button color="inherit">Dashboard</Button>
        </Link>
        <Link to="/employee-profile" className={classes.link}>
          <Button color="inherit">Perfil del empleado</Button>
        </Link>
        <Link to="/evaluation-form" className={classes.link}>
          <Button color="inherit">Formulario de evaluacion</Button>
        </Link>
        <Link to="/evaluation-results" className={classes.link}>
          <Button color="inherit">Resultados de evaluacion</Button>
        </Link>
        <Link to="/administration" className={classes.link}>
          <Button color="inherit">Administracion</Button>
        </Link>
        <Button color="inherit" onClick={onLogout}>
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
