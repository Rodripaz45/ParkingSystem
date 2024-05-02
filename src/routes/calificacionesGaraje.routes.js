//@ts-check
//@ts-check
import { Router } from "express";
import {
    createCalificacionGaraje,
    getAllCalificacionesGaraje,
    updateCalificacionGaraje,
    deleteCalificacionGaraje
} from "../controllers/calficicacionesGaraje.controller.js";

const router = Router();

router.post('/createCalificacionGaraje', createCalificacionGaraje);
router.get('/getAllCalificacionesGaraje', getAllCalificacionesGaraje);
router.put('/updateCalificacionGaraje/:id', updateCalificacionGaraje);
router.delete('/deleteCalificacionGaraje/:id', deleteCalificacionGaraje);

export default router;
