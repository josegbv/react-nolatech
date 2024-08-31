# react-nolatech

<h2>Sistema de evaluacion 360 Desarrollado en React</h2>

1) Para ingresar debes colocar 1 de los 2 usuarios permitidos a continuacion: ( usuario = user clave: user123 )  o ( usuario = admin clave: admin123 )

2) Si utilizas el usuario de nombre "user" no podras ver la seccion de "administracion" solo podras con el user "admin"

3) Se aplico react memo a la seccion de "perfiles de empleados" para mejorar el render

3) Se utilizo context api como manejador de estado para comunicar la autenticacion y roles principalmente

4) Se utilizo la libreria rechart para las graficas estadisticas

5) Se aplico MUI como estilo principal

6) Se simularon get y post con apis publicas en "Perfil de empleado" "Formulario de evaluacion" entre otros

7) Se incorporo Sistema de notificaciones para evaluaciones pendientes, Componente de búsqueda y filtrado para listas de empleados y evaluaciones y Componente de calendario para visualizar fechas límite de evaluacione

8) El diseño es totalmente responsive con animaciones Sutiles como en el caso de "Resultados de evaluaciones"

9) Se aplico lazy loading en 3 componentes "Dashboard" "EvaluationResults" "EmployeeProfile"

10) Se aplicaron test en "Login" y "ProtectedRoute" con Jest 

11) Se utilizo react-router-dom para las configuraciones de las rutas 

12) Se creo un Hook personalizado "useAuth" y crearon componentes reutilizables como "SearchBar" 

13) Para los formularios se uso Formik y para las validacion Yup


<h3> La web esta desplegada en netlify -> https://react-nolatech.netlify.app</h3>
<h3> Video Demostrativo -> https://www.youtube.com/watch?v=0xds_KI-fMk </h3>