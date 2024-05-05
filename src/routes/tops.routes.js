//@ts-check
import { Router } from "express";
import { getTopClientes, getTopOfertantes, getTopClientesMalos, getTopOfertantesMalos } from "../controllers/tops.controller.js";

const router = Router();

router.get('/getTopClientes', getTopClientes);
router.get('/getTopOfertantes', getTopOfertantes);
router.get('/getTopClientesMalos', getTopClientesMalos);
router.get('/getTopOfertantesMalos', getTopOfertantesMalos);

export default router;