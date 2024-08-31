import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Tooltip as MuiTooltip, Divider } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
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

const COLORS = [
  '#1976d2',
  '#ffeb3b',
  '#4caf50',
  '#f44336',
  '#e0e0e0',
  '#ff8042',
];

const pendingEvaluations = [
  { name: 'Front End', value: 3, date: '2023-09-01', time: '10:00 AM' },
  { name: 'UX/UI', value: 5, date: '2023-09-15', time: '11:00 AM' },
  { name: 'Back end', value: 15, date: '2023-09-20', time: '02:00 PM' },
  { name: 'QA', value: 10, date: '2023-09-25', time: '03:00 PM' },
  { name: 'Cientifico de Datos', value: 10, date: '2023-10-01', time: '09:00 AM' },
  { name: 'Scrum Master', value: 5, date: '2023-10-10', time: '01:00 PM' },
];

const Dashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredEvaluations, setFilteredEvaluations] = useState(pendingEvaluations);

  const handleFilter = () => {
    const filtered = pendingEvaluations.filter(
      (evaluation) =>
        (!startDate || new Date(evaluation.date) >= new Date(startDate)) &&
        (!endDate || new Date(evaluation.date) <= new Date(endDate))
    );
    setFilteredEvaluations(filtered);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const evaluation = filteredEvaluations.find(
        (evaluation) => new Date(evaluation.date).toDateString() === date.toDateString()
      );
      return evaluation ? (
        <MuiTooltip title={`${evaluation.name} - ${evaluation.time}`} arrow>
          <div>
            <p>{evaluation.name}</p>
          </div>
        </MuiTooltip>
      ) : null;
    }
  };

  return (
    <Container className="container" maxWidth="xl">
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item size={6} lg={5} xs={12} md={5}>
          <Box className="chart" height="100%">
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              justifyContent="center"
              textAlign="center"
            >
              Evaluaciones Generales en el año
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={evaluations}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar
                  dataKey="successful"
                  stackId="a"
                  fill="#82ca9d"
                  name="Exitosas"
                />
                <Bar
                  dataKey="unsuccessful"
                  stackId="a"
                  fill="#ff7f7f"
                  name="No exitosas"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid item size={6} lg={5} xs={12} md={5}>
          <Box className="chart" height="100%">
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              justifyContent="center"
              textAlign="center"
            >
              Perfiles Registrados por Rol
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      <Box p={5}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          justifyContent="center"
          textAlign="center"
        >
          Evaluaciones Pendientes
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={filteredEvaluations}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Pendientes" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center" width="100%">
              <Calendar
                tileContent={tileContent}
                className="mui-calendar"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
