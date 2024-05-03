//@ts-check
import { Router } from "express";
import { createCalificacionCliente, getAllCalificacionesCliente, updateCalificacionCliente, deleteCalificacionCliente, getAverageCalificacionCliente } from "../controllers/calificacionesCliente.controller.js";

const router = Router();

router.post('/createCalificacionCliente', createCalificacionCliente);
router.get('/getAllCalificacionesCliente', getAllCalificacionesCliente);

router.put('/updateCalificacionCliente/:id', updateCalificacionCliente);
router.delete('/deleteCalificacionCliente/:id', deleteCalificacionCliente);

router.get('/average/:fk_id_usuario', getAverageCalificacionCliente);

export default router;
