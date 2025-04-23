import express from 'express';
import carController from '../controllers/car.controller.js';

const carRouter = express.Router();

carRouter.get('/', carController.getAllCars);
carRouter.post('/', carController.createCar);
carRouter.get('/:id', carController.getCarById);

export default carRouter;