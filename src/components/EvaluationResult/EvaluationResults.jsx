
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Divider,
  Container,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
} from '@mui/material';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import axios from 'axios';

// Roles estáticos
const roles = [
  { name: 'Front End', value: 40 },
  { name: 'UX/UI', value: 20 },
  { name: 'Back end', value: 15 },
  { name: 'QA', value: 10 },
  { name: 'Científico de Datos', value: 10 },
  { name: 'Scrum Master', value: 5 },
];

const ResultadosEvaluacion = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employeeStats, setEmployeeStats] = useState({ radarData: [], barData: [] });

  // Llamada a la API al seleccionar un rol
  useEffect(() => {
    if (selectedRole) {
      setLoading(true);
      axios
        .get('https://randomuser.me/api/?results=5')
        .then((response) => {
          // Simular la estructura de candidatos y asignar nombres
          const fetchedCandidates = response.data.results.map((user, index) => ({
            name: `${user.name.first} ${user.name.last}`,
            radarData: [
              { subject: 'Confianza y Delegación', A: Math.floor(Math.random() * 6), fullMark: 5 },
              { subject: 'Comunicación', A: Math.floor(Math.random() * 6), fullMark: 5 },
              { subject: 'Adaptabilidad', A: Math.floor(Math.random() * 6), fullMark: 5 },
              { subject: 'Priorización de Tareas', A: Math.floor(Math.random() * 6), fullMark: 5 },
              { subject: 'Colaboración', A: Math.floor(Math.random() * 6), fullMark: 5 },
              { subject: 'Desempeño Técnico', A: Math.floor(Math.random() * 6), fullMark: 5 },
            ],
            barData: [
              { subject: 'Confianza y Delegación', Puntuacion: Math.floor(Math.random() * 6) },
              { subject: 'Comunicación', Puntuacion: Math.floor(Math.random() * 6) },
              { subject: 'Adaptabilidad', Puntuacion: Math.floor(Math.random() * 6) },
              { subject: 'Priorización de Tareas', Puntuacion: Math.floor(Math.random() * 6) },
              { subject: 'Colaboración', Puntuacion: Math.floor(Math.random() * 6) },
              { subject: 'Desempeño Técnico', Puntuacion: Math.floor(Math.random() * 6) },
            ],
          }));
          setCandidates(fetchedCandidates);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [selectedRole]);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    setSelectedCandidate(null);
  };

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setEmployeeStats({
      radarData: candidate.radarData,
      barData: candidate.barData,
    });
  };

  return (
    <Container className="container" maxWidth="xl">
      <Typography variant="h5" gutterBottom>
        Resultados de Evaluación
      </Typography>

      {/* Selección de Rol */}
      <Select value={selectedRole} onChange={handleRoleChange} displayEmpty fullWidth sx={{ mb: 4 }}>
        <MenuItem value="" disabled>
          Selecciona un rol
        </MenuItem>
        {roles.map((role) => (
          <MenuItem key={role.name} value={role.name}>
            {role.name}
          </MenuItem>
        ))}
      </Select>

      {/* Mostrar Candidatos */}
      {loading ? (
        <CircularProgress />
      ) : (
        candidates.length > 0 && (
          <Grid container spacing={2}>
            {candidates.map((candidate) => (
              <Grid item xs={12} sm={6} md={4} key={candidate.name}>
                <Card
                  onClick={() => handleCandidateSelect(candidate)}
                  sx={{
                    border: candidate === selectedCandidate ? '2px solid #3f51b5' : '1px solid #ccc',
                    boxShadow: candidate === selectedCandidate ? '0px 0px 10px rgba(0, 0, 0, 0.2)' : 'none',
                    transform: candidate === selectedCandidate ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6" color={candidate === selectedCandidate ? 'primary' : 'textPrimary'}>
                        {candidate.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      )}

      {/* Mostrar Estadísticas del Candidato Seleccionado */}
      {selectedCandidate && (
        <Grid container display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '37px' }}>
          <Grid item lg={5} md={5} xs={12}>
           
            <ResponsiveContainer width="100%" height={500}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={employeeStats.radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Puntuación" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />

          <Grid item lg={5} md={5} xs={12}>
            
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={employeeStats.barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" interval={0} angle={-45} textAnchor="end" height={120} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Puntuacion" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ResultadosEvaluacion;
