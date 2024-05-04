//@ts-check
import express from 'express';
import cors from 'cors';
import userroutes from "./routes/user.routes.js";
import garajeRoutes from './routes/garajes.routes.js';
import autoRoutes from './routes/auto.routes.js';
import reservacionesRoutes from './routes/reservaciones.routes.js';
import calificacionesClienteRoutes from './routes/calificacionesCliente.routes.js';
import calificacionesPropietarioRoutes from './routes/calificacionesPropietario.routes.js';
import calificacionesGarajeRoutes from './routes/calificacionesGaraje.routes.js';
import topsRoutes from './routes/tops.routes.js'

const app = express();

app.use(express.json());

// Configuración de CORS
app.use(cors());

app.use('/users',userroutes);

app.use('/reservaciones', reservacionesRoutes);
app.use('/garajes', garajeRoutes);
app.use('/autos', autoRoutes);

app.use('/calificacionesCliente', calificacionesClienteRoutes);
app.use('/calificacionesPropietario', calificacionesPropietarioRoutes);
app.use('/calificacionesGaraje', calificacionesGarajeRoutes);

app.use('/tops', topsRoutes)



app.listen(3000, () => {
    console.log("Server running on port 3000");
});