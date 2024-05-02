//@ts-check
import { Router } from "express";
import { createCalificacionCliente, getAllCalificacionesCliente, updateCalificacionCliente, deleteCalificacionCliente } from "../controllers/calificacionesCliente.controller.js";

const router = Router();

router.post('/createCalificacionCliente', createCalificacionCliente);
router.get('/getAllCalificacionesCliente', getAllCalificacionesCliente);

router.put('/updateCalificacionCliente/:id', updateCalificacionCliente);
router.delete('/deleteCalificacionCliente/:id', deleteCalificacionCliente);

export default router;
