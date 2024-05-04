//@ts-check
import { Router } from "express";
import { createReservacion, getAllReservaciones, getReservacionById, updateReservacion, deleteReservacion, updatePrecioReservacion, confirmReservacion, rejectReservacion, cancelReservacion, getReservacionesConfirmadas, getReservacionesRechazadas, getReservacionesPendientes, getReservacionesCanceladas } from "../controllers/reservaciones.controller.js";

const router = Router();

router.post('/createReservacion', createReservacion);
router.get('/getAllReservaciones', getAllReservaciones);

router.get('/getReservacionById/:id', getReservacionById);
router.put('/updateReservacion/:id', updateReservacion);
router.put('/updatePrecioReservacion/:id', updatePrecioReservacion);
router.put('/confirmReservacion/:id', confirmReservacion);
router.put('/rejectReservacion/:id', rejectReservacion);
router.put('/cancelReservacion/:id', cancelReservacion);
router.get('/getReservacionesConfirmadas', getReservacionesConfirmadas);
router.get('/getReservacionesRechazadas', getReservacionesRechazadas);
router.get('/getReservacionesPendientes', getReservacionesPendientes);
router.get('/getReservacionesCanceladas', getReservacionesCanceladas);
router.delete('/deleteReservacion/:id', deleteReservacion);

export default router;
