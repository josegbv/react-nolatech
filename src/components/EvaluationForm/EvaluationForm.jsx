import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Container, Button, TextField, MenuItem, Typography, Checkbox, ListItemText, Select, RadioGroup, FormControlLabel, Radio, Grid, Box, Modal, Alert, CircularProgress } from '@mui/material'; 
import { styled } from '@mui/system';
import * as Yup from 'yup';

// Tipos de preguntas disponibles
const questionTypes = {
  SCALE: 'Escala',
  MULTIPLE_CHOICE: 'Opción Múltiple',
  TEXT: 'Texto',
  SINGLE_CHOICE: 'Selección Única',
};

// Preguntas de ejemplo
const initialQuestions = [
  { id: 1, type: questionTypes.SCALE, question: '¿Confía y delega responsabilidades en su equipo?', options: ["Si", "No"] },
  { id: 2, type: questionTypes.MULTIPLE_CHOICE, question: '¿Cómo calificaría la comunicación del empleado?', options: ['Excelente', 'Buena', 'Regular', 'Mala'] },
  { id: 3, type: questionTypes.TEXT, question: 'Comentarios adicionales sobre la adaptabilidad del empleado', options: [] },
  { id: 4, type: questionTypes.SCALE, question: '¿Cómo prioriza sus tareas?', options: ["Muy mal", "Mal", "Regular", "Bien", "Muy bien"] },
  { id: 5, type: questionTypes.SINGLE_CHOICE, question: '¿Colabora eficazmente con otros miembros del equipo?', options: ['Siempre', 'Frecuentemente', 'A veces', 'Nunca'] },
  { id: 6, type: questionTypes.TEXT, question: 'Comentarios adicionales sobre el desempeño técnico del empleado', options: [] },
];

// Esquema de validación
const validationSchema = Yup.object().shape(
  initialQuestions.reduce((acc, question) => {
    if (question.type === questionTypes.MULTIPLE_CHOICE) {
      acc[question.id.toString()] = Yup.array().min(1, 'Selecciona al menos una opción');
    } else {
      acc[question.id.toString()] = Yup.string().required('Este campo es obligatorio');
    }
    return acc;
  }, {})
);

// Estilo personalizado para el contenedor del perfil del empleado
const EmployeeProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4)
}));

const EvaluationForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga

  // Valores iniciales
  const initialValues = initialQuestions.reduce((acc, question) => {
    acc[question.id.toString()] = question.type === questionTypes.MULTIPLE_CHOICE ? [] : '';
    return acc;
  }, {});

  // Manejo de envío del formulario
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true); // Activar estado de carga
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', values);
      console.log('Respuesta del servidor:', response.data);
      console.log('Valores del formulario:', values);
      resetForm();
      setOpen(true);
    } catch (error) {
      console.error('Error al enviar la evaluación:', error);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className="container" maxWidth="xl">
      <Typography variant="h5" component="h1" gutterBottom>
        Formulario de evaluación
      </Typography>
      <EmployeeProfileContainer>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">{initialQuestions[0].question}</Typography>
                  <Field
                    name={initialQuestions[0].id.toString()}
                    as={TextField}
                    select
                    fullWidth
                    error={touched[initialQuestions[0].id.toString()] && !!errors[initialQuestions[0].id.toString()]}
                    helperText={touched[initialQuestions[0].id.toString()] && errors[initialQuestions[0].id.toString()]}
                  >
                    {initialQuestions[0].options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{initialQuestions[1].question}</Typography>
                  <Field
                    name={initialQuestions[1].id.toString()}
                    as={Select}
                    multiple
                    value={values[initialQuestions[1].id.toString()]}
                    onChange={(event) => setFieldValue(initialQuestions[1].id.toString(), event.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    fullWidth
                    error={touched[initialQuestions[1].id.toString()] && !!errors[initialQuestions[1].id.toString()]}
                  >
                    {initialQuestions[1].options.map((option) => (
                      <MenuItem key={option} value={option}>
                        <Checkbox checked={values[initialQuestions[1].id.toString()].includes(option)} />
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))}
                  </Field>
                  {touched[initialQuestions[1].id.toString()] && errors[initialQuestions[1].id.toString()] && (
                    <Typography color="error">{errors[initialQuestions[1].id.toString()]}</Typography>
                  )}
                </Grid>
              </Grid>
              {initialQuestions.slice(2).map((question, index) => (
                <div key={question.id} style={{ marginBottom: '16px', marginTop: index === 0 ? '21px' : '0' }}>
                  <Typography variant="body1">{question.question}</Typography>
                  {question.type === questionTypes.SCALE && (
                    <Field
                      name={question.id.toString()}
                      as={TextField}
                      select
                      fullWidth
                      error={touched[question.id.toString()] && !!errors[question.id.toString()]}
                      helperText={touched[question.id.toString()] && errors[question.id.toString()]}
                    >
                      {question.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Field>
                  )}
                  {question.type === questionTypes.MULTIPLE_CHOICE && (
                    <Field
                      name={question.id.toString()}
                      as={Select}
                      multiple
                      value={values[question.id.toString()]}
                      onChange={(event) => setFieldValue(question.id.toString(), event.target.value)}
                      renderValue={(selected) => selected.join(', ')}
                      fullWidth
                      error={touched[question.id.toString()] && !!errors[question.id.toString()]}
                    >
                      {question.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox checked={values[question.id.toString()].includes(option)} />
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Field>
                  )}
                  {question.type === questionTypes.SINGLE_CHOICE && (
                    <RadioGroup
                      name={question.id.toString()}
                      value={values[question.id.toString()]}
                      onChange={(event) => setFieldValue(question.id.toString(), event.target.value)}
                    >
                      {question.options.map((option) => (
                        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                      ))}
                    </RadioGroup>
                  )}
                  {question.type === questionTypes.TEXT && (
                    <Field
                      name={question.id.toString()}
                      as={TextField}
                      multiline
                      rows={4}
                      fullWidth
                      error={touched[question.id.toString()] && !!errors[question.id.toString()]}
                      helperText={touched[question.id.toString()] && errors[question.id.toString()]}
                    />
                  )}
                  {touched[question.id.toString()] && errors[question.id.toString()] && (
                    <Typography color="error">{errors[question.id.toString()]}</Typography>
                  )}
                </div>
              ))}
              <Box mt={2} display="flex" justifyContent="center">
                {loading ? (
                  <CircularProgress /> // Indicador de carga
                ) : (
                  <Button type="submit" variant="contained" color="primary">Enviar Evaluación</Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Alert onClose={handleClose} severity="success">
              ¡Evaluación enviada correctamente!
            </Alert>
          </Box>
        </Modal>
      </EmployeeProfileContainer>
    </Container>
  );
};

export default EvaluationForm;
