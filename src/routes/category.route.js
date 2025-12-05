import express from 'express'
import { deleteCategoryById, getAllCategory, getCategoryById, registerCategory,} from '../controllers/category.controller.js';

const router = express.Router();

router.post('/', registerCategory);
router.get('/', getAllCategory);
router.get('/:idCategory', getCategoryById);
router.delete('/:idCategory', deleteCategoryById);




export default router;