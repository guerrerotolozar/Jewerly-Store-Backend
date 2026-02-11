import productModel from "../models/Product.model.js";

const dbRegisterProduct = async (newProduct) => {
    return await productModel.create(newProduct);   // async/await porque el modelo retorna una promesa
}

const dbGetAllProducts = async () => {
    return await productModel.find({ isActive: true }).populate(['category']);
}

const dbGetProductsGroupedByCategory = async () => {
    const result = await productModel.aggregate([
        
        // 1️⃣ Filtrar productos activos
        {
            $match: { isActive: true }
        },

        // 2️⃣ JOIN con categorias (populate equivalente)
        {
            $lookup: {
                from: 'categories', // nombre REAL de la colección
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },

        // 3️⃣ convertir array category en objeto
        {
            $unwind: '$category'
        },

        // 4️⃣ agrupar por nombre de categoria
        {
            $group: {
                _id: '$category.name',
                products: { $push: '$$ROOT' }
            }
        },

        // 5️⃣ convertir a formato key:value
        {
            $project: {
                _id: 0,
                k: '$_id',
                v: '$products'
            }
        },

        // 6️⃣ convertir array a objeto final
        {
            $group: {
                _id: null,
                data: { $push: { k: '$k', v: '$v' } }
            }
        },
        {
            $replaceRoot: {
                newRoot: { $arrayToObject: '$data' }
            }
        }

    ]);

    return result[0];
}

const dbGetProductsById = async (_id) => {
    return await productModel.findOne({ _id, isActive: true });
}

const dbDeleteProductById = async (_id) => {
    return await productModel.findOneAndDelete({ _id });
    return await productModel.findByIdAndDelete({ _id })
}

export {
    dbRegisterProduct,
    dbGetAllProducts,
    dbGetProductsById,
    dbDeleteProductById,
    dbGetProductsGroupedByCategory
}