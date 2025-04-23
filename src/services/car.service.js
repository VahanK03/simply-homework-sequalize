import Car from "../models/car.js";

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
}

export default new CarService();