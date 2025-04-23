import DealershipService from "../services/dealership.service.js";

class DealershipController {
    async getAllCars(req, res) {
        const cars = await DealershipService.getAllCars();
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
}

export default new DealershipController();