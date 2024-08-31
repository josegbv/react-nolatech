import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Box, Typography, List, ListItem, ListItemText, TextField, Container, Pagination } from '@mui/material';
import { styled } from '@mui/system';

const EmployeeProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4)
}));

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const EmployeeProfile = ({ employee }) => (
  <EmployeeProfileContainer>
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar alt={employee.name} src={employee.avatar_url || '/default-avatar.png'} sx={{ width: 56, height: 56, mr: 2 }} />
      <Box ml={2}>
        <Typography variant="h4">{capitalizeFirstLetter(employee.name)}</Typography>
        <Typography variant="body1">{employee.country}</Typography>
      </Box>
    </Box>
    <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
    <Typography variant="body1"><strong>Teléfono:</strong> {employee.phone}</Typography>
    <Typography variant="h5" mt={3}>Información Profesional</Typography>
    <Typography variant="body1"><strong>Posición:</strong> {employee.position}</Typography>
    <Typography variant="body1"><strong>Experiencia:</strong> {employee.experience} años</Typography>
    <Typography variant="h5" mt={3}>Historial de Evaluaciones</Typography>
    <List>
      <ListItem>
        <ListItemText primary="Disponibilidad" secondary={employee.skills.availability} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Habilidades blandas" secondary={employee.skills.softSkills} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Entrevista Técnica" secondary={employee.skills.technicalInterview} />
      </ListItem>
    </List>
  </EmployeeProfileContainer>
);

const EmployeeSearch = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const employeesPerPage = 5;

  useEffect(() => {
    axios.get('https://api.github.com/users')
      .then(response => {
        const positions = ['Desarrollador Frontend', 'Desarrollador Backend', 'QA', 'UX/UI', 'Científico de Datos', 'Scrum Master'];
        const availabilities = ['Inmediata', '1 mes', '3 meses'];
        const softSkills = ['Altas', 'Medias', 'Bajas'];
        const countries = ['España', 'México', 'Argentina', 'Colombia', 'Chile', 'Perú'];

        const enrichedEmployees = response.data.map(user => ({
          id: user.id,
          name: capitalizeFirstLetter(user.login),
          avatar_url: user.avatar_url,
          country: countries[Math.floor(Math.random() * countries.length)],
          email: `${user.login}@example.com`,
          phone: `+34 600 ${Math.floor(100000 + Math.random() * 900000)}`,
          position: positions[Math.floor(Math.random() * positions.length)],
          experience: Math.floor(Math.random() * 10) + 1,
          skills: {
            availability: availabilities[Math.floor(Math.random() * availabilities.length)],
            softSkills: softSkills[Math.floor(Math.random() * softSkills.length)],
            technicalInterview: availabilities[Math.floor(Math.random() * availabilities.length)]
          }
        }));
        setEmployees(enrichedEmployees);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * employeesPerPage,
    page * employeesPerPage
  );

  return (
    <Container className="container" maxWidth="xl">
      <Typography variant="h5" gutterBottom>
        Perfil de empleado
      </Typography>
   
      <TextField
        
        label="Buscar empleado"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
     
      {paginatedEmployees.map((employee) => (
        <EmployeeProfile key={employee.id} employee={employee} />
      ))}

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(filteredEmployees.length / employeesPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ mt: 2 }}
        />
      </Box>
    </Container>
  );
};


export default React.memo(EmployeeSearch);