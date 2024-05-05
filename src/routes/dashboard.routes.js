//@ts-check
import { Router } from "express";
import { getTotalConfirmedReservations, getTotalRejectedReservations, getGarajesDisponibles, getGarajesOcupados, getRechazosPorCliente, getRechazosPorOfertantes } from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/getTotalConfirmadas', getTotalConfirmedReservations);
router.get('/getTotalRechazadas', getTotalRejectedReservations);
router.get('/getTotalGarajesDisponibles', getGarajesDisponibles);
router.get('/getTotalGarajesOcupados', getGarajesOcupados);
router.get('/getRechazosPorCliente', getRechazosPorCliente);
router.get('/getRechazosPorOfertantes', getRechazosPorOfertantes);

export default router;
