import ReviewsModel from '../models/reviews.model.js';


const dbRegisterReview = async (newReview) => {
    return await ReviewsModel.create(newReview);
};
// Obtener reviews por producto 
const dbGetReviewsByProduct = async (productId) => {
    return await ReviewsModel.find({product: productId})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
};
// Eliminar review por id
const dbDeleteReviewById = async (_id) => {
    return await ReviewsModel.findByIdAndDelete({ _id });
};

export {
    dbRegisterReview,
    dbGetReviewsByProduct,
    dbDeleteReviewById
};
