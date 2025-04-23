import Car from "../models/car.js";
import Feature from "../models/feature.js";
import CarFeatures from "../models/car_features.js";

class CarService {
    async getAllCars() {
        return await Car.findAll({include: ['model', 'features']},);
    }

    async getCarById(id) {
        const car = await Car.findOne(
            {
                where: { id },
                include: ['model', 'features']
            }
        );
        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    }

    async createCar(carData) {
        return await Car.create(carData);
    }

    async addFeature(id, featureId) {
        const car = await Car.findByPk(id);
        const feature = await Feature.findByPk(featureId);
        if (!car || !feature) return { error: 'Car or Feature not found' };
        await CarFeatures.create({
            car_id: car.id,
            feature_id: feature.id
        });
    }

    async removeFeature(id, fid) {
        const car = await Car.findByPk(id);
        const feature = await Feature.findByPk(fid);
        if (!car || !feature) return { error: 'Car or Feature not found' }
        await CarFeatures.destroy({ where: { car_id: car.id, feature_id: feature.id } });
    }
}

export default new CarService();