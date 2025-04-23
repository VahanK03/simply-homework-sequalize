import CarService from '../services/car.service.js'

class CarController {
    async getAllCars(req, res) {
        const cars = await CarService.getAllCars();
        res.json(cars);
    }

    async getCarById(req, res) {
        const {id} = req.params;
        const car = await CarService.getCarById(id);
        res.json(car);
    }

    async createCar(req, res) {
        const car = await CarService.createCar({...req.body});
        res.status(201).json(car);
    }

    async addFeature(req, res) {
        const { id } = req.params;
        const { featureId } = req.body;
        res.json(await CarService.addFeature(id, featureId));
    }

    async removeFeature(req, res) {
        const { id, fid } = req.params;
        res.json(await CarService.removeFeature(id, fid));
    }
}

export default new CarController();