import { Router } from "express";
import { addSupplier } from "../controllers/supplier";

const router = Router()

router.get('/')
router.post('/add-supplier', addSupplier)


export default router