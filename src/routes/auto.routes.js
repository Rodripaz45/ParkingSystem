//@ts-check
import { Router } from "express";
import { addAuto, deleteAuto, getAllAutos, getAutosById, updateAuto } from "../controllers/autos.controller.js";

const router = Router();

router.post('/addAuto', addAuto);
router.get('/getAllAutos', getAllAutos);

router.get('/getAutosById/:id', getAutosById);
router.put('/updateAuto/:id', updateAuto);
router.delete('/deleteAuto/:id', deleteAuto);

export default router;