//@ts-check
import { Router } from "express";
import { addGaraje, deleteGaraje, getAllGarajes, getGarajeById, updateGaraje } from "../controllers/garajes.controller.js";

const router = Router();

router.post('/addGaraje', addGaraje);
router.get('/getAllGarajes', getAllGarajes);

router.get('/getGarajeById/:id', getGarajeById);
router.put('/updateGaraje/:id', updateGaraje);
router.delete('/deleteGaraje/:id', deleteGaraje);

export default router;