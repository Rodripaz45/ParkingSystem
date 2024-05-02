import { Router } from "express";
import { addAuto } from "../controllers/autos.controller.js";

const router = Router();

router.post('/addAuto', addAuto);

export default router;
