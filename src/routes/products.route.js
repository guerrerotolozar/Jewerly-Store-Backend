import express from 'express'
import { deleteProductById, getAllProducts, getProductsById, getProductsGroupedByCategory, registerProduct, updateProductsById } from '../controllers/product.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { ALLOWED_ROLES, ROLES } from '../config/global.config.js';

const router = express.Router();


router.post('/', [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLLABORATOR])], registerProduct);
router.get('/', getAllProducts);
router.get('/category', getProductsGroupedByCategory);
router.get('/:idProducts', getProductsById);
router.delete('/:idProducts', [authenticationUser, authorizationUser([ROLES.ADMIN])], deleteProductById);
router.patch('/:idProducts', [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLLABORATOR])], updateProductsById);




export default router;