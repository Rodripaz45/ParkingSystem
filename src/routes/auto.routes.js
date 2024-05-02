//@ts-check
import { Router } from "express";
import { addAuto, deleteAuto, getAllAutos, getAutoById, updateAuto } from "../controllers/autos.controller.js";

const router = Router();

router.post('/addAuto', addAuto);
router.get('/getAllAutos', getAllAutos);

router.get('/getAutoById/:id', getAutoById);
router.put('/updateAuto/:id', updateAuto);
router.delete('/deleteAuto/:id', deleteAuto);

export default router;