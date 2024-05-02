import { Router } from "express";
import { addGaraje } from "../controllers/garajes.controller.js";

const router = Router();

// Endpoint para agregar un nuevo garaje
router.post('/addGaraje', addGaraje);

// Endpoint para obtener todos los garajes
router.get('/getAllGarajes', getAllGarajes);

// Endpoint para obtener un garaje por ID
router.get('/getGarajeById/:id', getGarajeById);

// Endpoint para actualizar un garaje
router.put('/updateGaraje/:id', updateGaraje);

// Endpoint para eliminar un garaje
router.delete('/deleteGaraje/:id', deleteGaraje);

export default router;