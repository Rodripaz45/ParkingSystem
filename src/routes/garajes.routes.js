//@ts-check
import { Router } from "express";
import { addGaraje, deleteGaraje, getAllGarajes, getGarajeById, updateGaraje, setGarajeDisponible, setGarajeOcupado, getGarajesDisponibles, getGarajesOcupados } from "../controllers/garajes.controller.js";

const router = Router();

router.post('/addGaraje', addGaraje);
router.get('/getAllGarajes', getAllGarajes);
router.get('/getGarajesDisponibles', getGarajesDisponibles);
router.get('/getGarajesOcupados', getGarajesOcupados);

router.get('/getGarajeById/:id', getGarajeById);
router.put('/updateGaraje/:id', updateGaraje);
router.put('/setGarajeDisponible/:id', setGarajeDisponible);
router.put('/setGarajeOcupado/:id', setGarajeOcupado);
router.delete('/deleteGaraje/:id', deleteGaraje);

export default router;