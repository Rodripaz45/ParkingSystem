//@ts-check
import { Router } from "express";
import { createCalificacionPropietario, getAllCalificacionesPropietario, updateCalificacionPropietario, deleteCalificacionPropietario } from "../controllers/calificacionesPropietario.controller.js";

const router = Router();

router.post('/createCalificacionPropietario', createCalificacionPropietario);
router.get('/getAllCalificacionesPropietario', getAllCalificacionesPropietario);

router.put('/updateCalificacionPropietario/:id', updateCalificacionPropietario);
router.delete('/deleteCalificacionPropietario/:id', deleteCalificacionPropietario);

export default router;
