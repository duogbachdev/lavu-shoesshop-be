import { Router } from "express";
import { addSupplier, deleteSupplier, getSuppliers, updateSupplier } from "../controllers/supplier";

const router = Router()

router.get('/', getSuppliers)
router.post('/add-supplier', addSupplier)
router.put('/update-supplier', updateSupplier)
router.delete('/delete-supplier', deleteSupplier)



export default router