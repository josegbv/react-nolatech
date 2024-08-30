import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, MenuItem, Typography, Checkbox, ListItemText, Select, RadioGroup, FormControlLabel, Radio, Grid, Box, Modal, Alert } from '@mui/material'; 
import { styled } from '@mui/system';

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

  // Valores iniciales
  const initialValues = initialQuestions.reduce((acc, question) => {
    acc[question.id.toString()] = question.type === questionTypes.MULTIPLE_CHOICE ? [] : '';
    return acc;
  }, {});

  // Manejo de envío del formulario
  const handleSubmit = (values, { resetForm }) => {
    console.log('Valores del formulario:', values);
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <EmployeeProfileContainer>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <Typography variant="h5" gutterBottom>Formulario de Evaluación</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">{initialQuestions[0].question}</Typography>
                <Field name={initialQuestions[0].id.toString()} as={TextField} select fullWidth>
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
                >
                  {initialQuestions[1].options.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={values[initialQuestions[1].id.toString()].includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
            </Grid>
            {initialQuestions.slice(2).map((question, index) => (
              <div key={question.id} style={{ marginBottom: '16px', marginTop: index === 0 ? '21px' : '0' }}>
                <Typography variant="body1">{question.question}</Typography>
                {question.type === questionTypes.SCALE && (
                  <Field name={question.id.toString()} as={TextField} select fullWidth>
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
                  />
                )}
              </div>
            ))}
            <Button type="submit" variant="contained" color="primary">Enviar Evaluación</Button>
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
  );
};

export default EvaluationForm;
