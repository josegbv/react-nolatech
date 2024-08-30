import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Button, TextField, MenuItem, IconButton, Typography, Grid, Box, Modal, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { styled } from '@mui/system';

const questionTypes = {
  SCALE: 'Escala',
  MULTIPLE_CHOICE: 'Opción Múltiple',
  TEXT: 'Texto',
  SINGLE_CHOICE: 'Selección Única',
};

// Estilo personalizado para el contenedor del perfil del empleado
const AdminContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4)
}));

const Administration = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    setEvaluations([...evaluations, values]);
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AdminContainer>
      <Formik
        initialValues={{ questions: [{ type: questionTypes.TEXT, question: '', options: [] }] }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Typography variant="h5" gutterBottom>Administración de Evaluaciones</Typography>
            <FieldArray name="questions">
              {({ push, remove }) => (
                <>
                  {values.questions.map((_, index) => (
                    <Grid container spacing={2} key={index} style={{ marginBottom: '16px' }}>
                      <Grid item xs={12}>
                        <Field
                          name={`questions.${index}.question`}
                          as={TextField}
                          label="Pregunta"
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name={`questions.${index}.type`}
                          as={TextField}
                          select
                          fullWidth
                          label="Tipo de Pregunta"
                          variant="outlined"
                          style={{ marginTop: '8px' }}
                        >
                          {Object.entries(questionTypes).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <IconButton onClick={() => remove(index)} color="secondary">
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    type="button"
                    onClick={() => push({ type: questionTypes.TEXT, question: '', options: [] })}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Agregar Pregunta
                  </Button>
                </>
              )}
            </FieldArray>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '103px' }}>
              Guardar Evaluación
            </Button>
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
          }}>
          <Alert severity="success">¡Evaluación guardada correctamente!</Alert>
        </Box>
      </Modal>
    </AdminContainer>
  );
};

export default Administration;
