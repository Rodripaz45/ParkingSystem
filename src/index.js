import express from 'express';
import cors from 'cors';
import userroutes from "./routes/user.routes.js";
import garajeRoutes from './routes/garajes.routes.js';
import autoRoutes from './routes/auto.routes.js';

const app = express();

app.use(express.json());

// Configuración de CORS
app.use(cors());

app.use(userroutes);

app.use('/garajes', garajeRoutes);
app.use('/autos', autoRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});