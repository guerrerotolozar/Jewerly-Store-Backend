import express from 'express'
import { deleteProductById, getAllProducts, getProductsById, getProductsGroupedByCategory, registerProduct, updateProductsById } from '../controllers/product.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { ALLOWED_ROLES, ROLES } from '../config/global.config.js';

const router = express.Router();


router.post('/',[ authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLLABORATOR]) ], registerProduct);
router.get('/',[ authenticationUser, authorizationUser(ALLOWED_ROLES) ], getAllProducts);
router.get('/category',[ authenticationUser, authorizationUser(ALLOWED_ROLES) ], getProductsGroupedByCategory);
router.get('/:idProducts',[ authenticationUser, authorizationUser(ALLOWED_ROLES) ], getProductsById);
router.delete('/:idProducts',[ authenticationUser, authorizationUser([ROLES.ADMIN]) ], deleteProductById);
router.patch('/:idProducts',[ authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLLABORATOR]) ], updateProductsById);



    
export default router;