// src/components/Administration/Administration.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Button,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Grid,
  Box,
  Modal,
  Alert,
  Container
} from '@mui/material';
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
  marginTop: theme.spacing(4),
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
  <Container className="container" maxWidth="xl">
    <Typography variant="h5" gutterBottom>
      Administración de Evaluaciones
    </Typography>
      <AdminContainer>
        <Formik
          initialValues={{
            questions: [{ type: questionTypes.TEXT, question: '', options: [''] }],
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <>
                    {values.questions.map((question, index) => (
                      <Grid
                        container
                        spacing={2}
                        key={index}
                        style={{ marginBottom: '16px' }}
                      >
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

                        {/* Condición para mostrar opciones si el tipo de pregunta lo requiere */}
                        {(question.type === questionTypes.SCALE ||
                          question.type === questionTypes.MULTIPLE_CHOICE ||
                          question.type === questionTypes.SINGLE_CHOICE) && (
                        <Box mt={2}> {/* Añadir margen superior aquí */}
                          <FieldArray name={`questions.${index}.options`} >
                            {({ push: pushOption, remove: removeOption }) => (
                              <>
                                {question.options &&
                                  question.options.map((_, optionIndex) => (
                                    <Grid
                                      container
                                      spacing={1}
                                      alignItems="center"
                                      key={optionIndex}
                                      sx={{ ml: 2 }}
                                    >
                                      <Grid item xs={10} mt={1}>
                                        <Field
                                          name={`questions.${index}.options.${optionIndex}`}
                                          as={TextField}
                                          label={`Opción ${optionIndex + 1}`}
                                          fullWidth
                                          variant="outlined"
                                        />
                                      </Grid>
                                      <Grid item xs={2}>
                                        <IconButton
                                          onClick={() =>
                                            removeOption(optionIndex)
                                          }
                                          color="error"
                                        >
                                          <RemoveCircleOutlineIcon />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  ))}
                                <Button
                                  type="button"
                                  onClick={() => pushOption('')}
                                  startIcon={<AddCircleOutlineIcon />}
                                  size="small"
                                  sx={{ ml: 3 }}
                                >
                                  Agregar Opción
                                </Button>
                              </>
                            )}
                          </FieldArray>
                          </Box>
                        )}

                        <Grid item xs={12}>
                          <IconButton
                            onClick={() => remove(index)}
                            color="secondary"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        push({
                          type: questionTypes.TEXT,
                          question: '',
                          options: [''],
                        })
                      }
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      Agregar Pregunta
                    </Button>
                  </>
                )}
              </FieldArray>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '103px' }}
              >
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
            }}
          >
            <Alert severity="success">¡Evaluación guardada correctamente!</Alert>
          </Box>
        </Modal>
      </AdminContainer>
    </Container>
  );
};

export default Administration;
