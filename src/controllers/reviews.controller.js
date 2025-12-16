import ReviewsModel from "../models/reviews.model.js";
import { dbDeleteReviewById, dbGetReviewsByProduct, dbRegisterReview } from "../services/reviews.service.js";

const registerReview = async (req, res) => {

    try {
        const { product, rating, comment } = req.body;
        const user = req.user._id;

        const newReview = {
            product,
            user,
            rating,
            comment
        };

        const review = await dbRegisterReview(newReview);

        res.json({
            msg: "Review creada con exito :)",
            review
        });

    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No se pudo crear la review'
        });
    }
}

const getReviewsByProductId = async (req, res) => {
    try {
        const idProducts = req.params.idProducts;

        const reviews = await dbGetReviewsByProduct(idProducts);

        res.json({
            ok: true,
            reviews,
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error.Message'
        });
    }
}

const deleteReview = async (req, res) => {
    try {
        const idProducts = req.params.idProducts;
        const reviewDeleted = await dbDeleteReviewById(idProducts)
        res.json({
            msg: "Review eliminada"
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error al eliminar review'
        });
    }
}







export {
    registerReview,
    getReviewsByProductId,
    deleteReview
};