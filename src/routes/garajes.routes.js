import { Router } from "express";
import { addGaraje } from "../controllers/garajes.controller.js";

const router = Router();

router.post('/addGaraje', addGaraje);

export default router;
