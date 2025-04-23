import Model from "../models/model.js";

class ModelService {
    async getAllModels() {
        return await Model.findAll({include: ['make']},);
    }
}

export default new ModelService();