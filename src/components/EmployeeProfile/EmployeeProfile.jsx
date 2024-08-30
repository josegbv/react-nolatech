// src/components/EmployeeProfile.jsx
import React, { useState } from 'react';
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


const employees = [
  {
    id: 1,
    name: 'Ana García',
    country: 'México',
    email: 'ana.garcia@example.com',
    phone: '+52 55 1234 5678',
    position: 'Desarrolladora Backend',
    experience: 7,
    avatar: '/path/to/avatar1.png',
    skills: {
      codingTest: 'Sobresaliente',
      softSkills: 'Bueno',
      technicalInterview: 'Excelente'
    }
  },
  {
    id: 2,
    name: 'Juan Pérez',
    country: 'España',
    email: 'juan.perez@example.com',
    phone: '+34 600 123 456',
    position: 'Desarrollador Frontend',
    experience: 5,
    avatar: '/path/to/avatar2.png',
    skills: {
      codingTest: 'Aprobado',
      softSkills: 'Excelente',
      technicalInterview: 'Muy Bueno'
    }
  },
  {
    id: 3,
    name: 'María López',
    country: 'Argentina',
    email: 'maria.lopez@example.com',
    phone: '+54 9 11 1234 5678',
    position: 'Diseñadora UX/UI',
    experience: 4,
    avatar: '/path/to/avatar3.png',
    skills: {
      codingTest: 'Bueno',
      softSkills: 'Muy Bueno',
      technicalInterview: 'Bueno'
    }
  },
  {
    id: 4,
    name: 'Carlos Fernández',
    country: 'Chile',
    email: 'carlos.fernandez@example.com',
    phone: '+56 9 8765 4321',
    position: 'Ingeniero de DevOps',
    experience: 6,
    avatar: '/path/to/avatar4.png',
    skills: {
      codingTest: 'Excelente',
      softSkills: 'Bueno',
      technicalInterview: 'Muy Bueno'
    }
  },
  {
    id: 5,
    name: 'Lucía Martínez',
    country: 'Colombia',
    email: 'lucia.martinez@example.com',
    phone: '+57 1 234 5678',
    position: 'Gerente de Proyecto',
    experience: 8,
    avatar: '/path/to/avatar5.png',
    skills: {
      codingTest: 'N/A',
      softSkills: 'Excelente',
      technicalInterview: 'N/A'
    }
  },
  {
    id: 6,
    name: 'Pedro Gómez',
    country: 'Perú',
    email: 'pedro.gomez@example.com',
    phone: '+51 1 234 5678',
    position: 'Analista de Datos',
    experience: 3,
    avatar: '/path/to/avatar6.png',
    skills: {
      codingTest: 'Bueno',
      softSkills: 'Muy Bueno',
      technicalInterview: 'Bueno'
    }
  },
  {
    id: 7,
    name: 'Sofía Ramírez',
    country: 'Uruguay',
    email: 'sofia.ramirez@example.com',
    phone: '+598 99 123 456',
    position: 'Desarrolladora Full Stack',
    experience: 5,
    avatar: '/path/to/avatar7.png',
    skills: {
      codingTest: 'Excelente',
      softSkills: 'Bueno',
      technicalInterview: 'Muy Bueno'
    }
  },
  {
    id: 8,
    name: 'Miguel Torres',
    country: 'Venezuela',
    email: 'miguel.torres@example.com',
    phone: '+58 212 123 4567',
    position: 'Ingeniero de Software',
    experience: 4,
    avatar: '/path/to/avatar8.png',
    skills: {
      codingTest: 'Muy Bueno',
      softSkills: 'Bueno',
      technicalInterview: 'Excelente'
    }
  },
  {
    id: 9,
    name: 'Laura Sánchez',
    country: 'Costa Rica',
    email: 'laura.sanchez@example.com',
    phone: '+506 1234 5678',
    position: 'Especialista en Seguridad',
    experience: 6,
    avatar: '/path/to/avatar9.png',
    skills: {
      codingTest: 'Bueno',
      softSkills: 'Excelente',
      technicalInterview: 'Muy Bueno'
    }
  },
  {
    id: 10,
    name: 'Diego Rojas',
    country: 'Paraguay',
    email: 'diego.rojas@example.com',
    phone: '+595 21 123 456',
    position: 'Administrador de Sistemas',
    experience: 7,
    avatar: '/path/to/avatar10.png',
    skills: {
      codingTest: 'Muy Bueno',
      softSkills: 'Bueno',
      technicalInterview: 'Excelente'
    }
  }
];
;

const EmployeeProfile = ({employee}) => (
  <EmployeeProfileContainer>
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar alt={employee.name} src={employee.avatar || '/default-avatar.png'} sx={{ width: 56, height: 56, mr: 2 }} />
      <Typography variant="h4">{employee.name}</Typography>
    </Box>
    <Typography variant="body1"><strong>País:</strong> {employee.country}</Typography>
    <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
    <Typography variant="body1"><strong>Teléfono:</strong> {employee.phone}</Typography>
    <Typography variant="h5" mt={3}>Información Profesional</Typography>
    <Typography variant="body1"><strong>Posición:</strong> {employee.position}</Typography>
    <Typography variant="body1"><strong>Experiencia:</strong> {employee.experience} años</Typography>
    <Typography variant="h5" mt={3}>Historial de Evaluaciones</Typography>
    <List>
      <ListItem>
        <ListItemText primary="Prueba de Codificación" secondary={employee.skills.codingTest} />
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
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const employeesPerPage = 5;

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
    <Container>
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


export default EmployeeSearch;
