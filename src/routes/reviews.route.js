import express from 'express'
import { registerReview, getReviewsByProductId, deleteReview } from '../controllers/reviews.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.post('/products/:idProducts', registerReview);
router.get('/products/:idProducts', getReviewsByProductId);
router.delete('/:idReview', deleteReview);




export default router;