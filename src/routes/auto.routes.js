import { Router } from "express";
import { addAuto } from "../controllers/autos.controller.js";

const router = Router();

// Endpoint para agregar un nuevo auto
router.post('/addAuto', addAuto);

// Endpoint para obtener todos los autos
router.get('/getAllAutos', getAllAutos);

// Endpoint para obtener un auto por ID
router.get('/getAutoById/:id', getAutoById);

// Endpoint para actualizar un auto
router.put('/updateAuto/:id', updateAuto);

// Endpoint para eliminar un auto
router.delete('/deleteAuto/:id', deleteAuto);

export default router;