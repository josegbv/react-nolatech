  // src/components/Dashboard.jsx
  import React from 'react';
  import { Container,  Typography,  Box , Grid , Divider} from '@mui/material';
  import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';

  import './Dashboard.css';

  const evaluations = [
    { monthYear: 'Jan 2023', successful: 30, unsuccessful: 10 },
    { monthYear: 'Feb 2023', successful: 20, unsuccessful: 15 },
    { monthYear: 'Mar 2023', successful: 27, unsuccessful: 12 },
    { monthYear: 'Apr 2023', successful: 18, unsuccessful: 20 },
    { monthYear: 'May 2023', successful: 23, unsuccessful: 17 },
    { monthYear: 'Jun 2023', successful: 34, unsuccessful: 8 },
    { monthYear: 'Jul 2023', successful: 29, unsuccessful: 13 },
    { monthYear: 'Aug 2023', successful: 24, unsuccessful: 16 },
    { monthYear: 'Sep 2023', successful: 31, unsuccessful: 9 },
    { monthYear: 'Oct 2023', successful: 22, unsuccessful: 14 },
    { monthYear: 'Nov 2023', successful: 28, unsuccessful: 11 },
    { monthYear: 'Dec 2023', successful: 25, unsuccessful: 15 },
  ];

  const data = [
    { name: 'Front End', value: 40 },
    { name: 'UX/UI', value: 20 },
    { name: 'Back end', value: 15 },
    { name: 'QA', value: 10 },
    { name: 'Cientifico de Datos', value: 10 },
    { name: 'Scrum Master', value: 5 },
  ];

  const COLORS = ['#1976d2', '#ffeb3b', '#4caf50', '#f44336', '#e0e0e0', '#ff8042'];



  const pendingEvaluations = [
    { name: 'Front End', value: 3 },
    { name: 'UX/UI', value: 5 },
    { name: 'Back end', value: 15 },
    { name: 'QA', value: 10 },
    { name: 'Cientifico de Datos', value: 10 },
    { name: 'Scrum Master', value: 5 },
  ];


  const Dashboard = () => {


    return (

      <Container className="container" maxWidth="xl">
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Grid container  justifyContent="space-around" alignItems="center">
          <Grid item  size={6} lg={5} xs={12} md={5}>
            <Box className="chart" height="100%">
              <Typography variant="h6" component="h2" gutterBottom justifyContent="center" textAlign="center">
                Evaluaciones Generales en el año
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={evaluations} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthYear" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="successful" stackId="a" fill="#82ca9d" name="Exitosas" />
                  <Bar dataKey="unsuccessful" stackId="a" fill="#ff7f7f" name="No exitosas" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Divider orientation="vertical" flexItem />
          
          <Grid item  size={6} lg={5}  xs={12} md={5}>
            <Box className="chart" height="100%">
              <Typography variant="h6" component="h2" gutterBottom justifyContent="center" textAlign="center">
              Perfiles Registrados por Rol
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>


        <Box  p={5}>
          <Typography variant="h6" component="h2" gutterBottom justifyContent="center" textAlign="center">
            Evaluaciones Pendientes
          </Typography>
      {    <ResponsiveContainer width="100%" height={400}>
            <BarChart data={pendingEvaluations} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Pendientes" />
            </BarChart>
          </ResponsiveContainer>}
        </Box>
      </Container>

    );
  };

  export default Dashboard;
