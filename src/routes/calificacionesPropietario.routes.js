//@ts-check
import { Router } from "express";
import { createCalificacionPropietario, getAllCalificacionesPropietario, updateCalificacionPropietario, deleteCalificacionPropietario, getAverageCalificacionPropietario } from "../controllers/calificacionesPropietario.controller.js";

const router = Router();

router.post('/createCalificacionPropietario', createCalificacionPropietario);
router.get('/getAllCalificacionesPropietario', getAllCalificacionesPropietario);

router.put('/updateCalificacionPropietario/:id', updateCalificacionPropietario);
router.delete('/deleteCalificacionPropietario/:id', deleteCalificacionPropietario);

router.get('/average/:fk_id_usuario', getAverageCalificacionPropietario);

export default router;
