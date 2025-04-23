import Dealership from "../models/dealership.js";

class DealershipService {
    async createDealership() {
        return await Dealership.findAll({include: ['car', 'user']},);
    }

    async getCarById(id) {
        const car = await Dealership.findOne(
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
}

export default new CarService();