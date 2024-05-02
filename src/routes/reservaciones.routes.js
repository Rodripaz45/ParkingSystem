//@ts-check
import { Router } from "express";
import { createReservacion, getAllReservaciones, getReservacionById, updateReservacion, deleteReservacion } from "../controllers/reservaciones.controller.js";

const router = Router();

router.post('/createReservacion', createReservacion);
router.get('/getAllReservaciones', getAllReservaciones);

router.get('/getReservacionById/:id', getReservacionById);
router.put('/updateReservacion/:id', updateReservacion);
router.delete('/deleteReservacion/:id', deleteReservacion);

export default router;
