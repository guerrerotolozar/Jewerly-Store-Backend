import express from 'express'
import { deleteProductById, getAllProducts, getProductsById, registerProduct, updateProductsById } from '../controllers/product.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.post('/',[ authenticationUser, authorizationUser ], registerProduct);
router.get('/',[ authenticationUser, authorizationUser ], getAllProducts);
router.get('/:idProducts',[ authenticationUser, authorizationUser ], getProductsById);
router.delete('/:idProducts',[ authenticationUser, authorizationUser ], deleteProductById);
router.patch('/:idProducts',[ authenticationUser, authorizationUser ], updateProductsById);



export default router;