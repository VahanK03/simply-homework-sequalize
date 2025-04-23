import express from 'express';
import carController from '../controllers/car.controller.js';

const carRouter = express.Router();

carRouter.get('/', carController.getAllCars);
carRouter.post('/', carController.createCar);
carRouter.get('/:id', carController.getCarById);
carRouter.post('/:id/features', carController.addFeature);
carRouter.delete('/:id/features/:fid', carController.removeFeature);

export default carRouter;