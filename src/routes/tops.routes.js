//@ts-check
import { Router } from "express";
import { getTopClientes, getTopOfertantes } from "../controllers/tops.controller.js";

const router = Router();

router.get('/getTopClientes', getTopClientes);
router.get('/getTopOfertantes', getTopOfertantes);

export default router;