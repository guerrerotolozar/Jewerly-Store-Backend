import collectionModel from '../models/collection.model.js';

const dbRegisterCollection = async (newCollection) => {
    return await collectionModel.create(newCollection);
};

const dbGetAllCollections = async () => {
    return await collectionModel
        .find({ isActive: true })
        .select('name slug parent isActive')
        .sort({ name: 1 });
};

const dbGetCollectionById = async (_id) => {
    return await collectionModel.findOne({ _id });
};

const dbDeleteCollectionById = async (_id) => {
    return await collectionModel.findByIdAndDelete({ _id });
};

export {
    dbRegisterCollection,
    dbGetAllCollections,
    dbGetCollectionById,
    dbDeleteCollectionById,
};
