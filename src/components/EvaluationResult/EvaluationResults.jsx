import React from 'react';
import { Grid, Typography, Divider, Container } from '@mui/material';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

// Datos basados en las preguntas del formulario de evaluación
const area = [
  { subject: 'Confianza y Delegación', A: 2, fullMark: 2 },
  { subject: 'Comunicación', A: 3, fullMark: 4 },
  { subject: 'Adaptabilidad', A: 5, fullMark: 5 },
  { subject: 'Priorización de Tareas', A: 2, fullMark: 5 },
  { subject: 'Colaboración', A: 4, fullMark: 4 },
  { subject: 'Desempeño Técnico', A: 3, fullMark: 5 },
];

const bar = [
  { subject: 'Confianza y Delegación', Puntuacion: 2 },
  { subject: 'Comunicación', Puntuacion: 3},
  { subject: 'Adaptabilidad', Puntuacion: 5},
  { subject: 'Priorización de Tareas', Puntuacion: 2 },
  { subject: 'Colaboración', Puntuacion: 4},
  { subject: 'Desempeño Técnico', Puntuacion: 3 },
];



const ResultadosEvaluacion = () => {
  return (
    <Container className="container" maxWidth="xl">
      <Typography variant="h4" gutterBottom >
        Resultados de Evaluación
      </Typography>
    <Grid container display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '37px' }}>

      <Grid item lg={5} md={5} xs={12}>
        <Typography variant="h6" gutterBottom>
          Gráfico de Radar
        </Typography>
        <ResponsiveContainer width="100%" height={500}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={area}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar name="Puntuación" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Grid>

  
      <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />

      <Grid item  lg={5} md={5} xs={12}>
        <Typography variant="h6" gutterBottom>
          Gráfico de Barras
        </Typography>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={bar} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" interval={0} angle={-45} textAnchor="end" height={120} />
            <YAxis  />
            <Tooltip />
            <Legend />
            <Bar dataKey="Puntuacion" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
    </Container>
  );
};

export default ResultadosEvaluacion;
