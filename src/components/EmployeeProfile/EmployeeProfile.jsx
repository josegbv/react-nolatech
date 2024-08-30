// src/components/EmployeeSearch.jsx
import React, { useState, useEffect } from 'react';
import { Container, TextField, Box, Pagination } from '@mui/material';
import axios from 'axios';
import EmployeeProfile from './EmployeeProfile';

const EmployeeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const employeesPerPage = 5;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://api.coresignal.com/v1/employees', {
          headers: {
            'Authorization': `eyJhbGciOiJFZERTQSIsImtpZCI6ImEwZGRmZTc5LTU4N2UtZjA4NS1kMTNkLTA3NTMwZjg2NTExMCJ9.eyJhdWQiOiJjaGF0dGlnby5jb20iLCJleHAiOjE3NTY2MDQxOTQsImlhdCI6MTcyNTA0NzI0MiwiaXNzIjoiaHR0cHM6Ly9vcHMuY29yZXNpZ25hbC5jb206ODMwMC92MS9pZGVudGl0eS9vaWRjIiwibmFtZXNwYWNlIjoicm9vdCIsInByZWZlcnJlZF91c2VybmFtZSI6ImNoYXR0aWdvLmNvbSIsInN1YiI6ImZhMGM0YzljLWMyMWMtZmZkZi1jMGI5LTQ4YWVkNWFmOWMxNiIsInVzZXJpbmZvIjp7InNjb3BlcyI6ImNkYXBpIn19.VEG8_TndZQIGc9PhW9HCgj2c-2Z9nNMd2X4-T4ZoZYRWSART0oC4ISdAn2kv5g1McufluL57y7O7J0SNlSduCQ`
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
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

