// SearchBar.js
import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <TextField
    label="Buscar empleado"
    variant="outlined"
    fullWidth
    margin="normal"
    value={searchTerm}
    onChange={onSearchChange}
  />
);

export default SearchBar;
