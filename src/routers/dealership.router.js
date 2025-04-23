import express from 'express';

import dealershipController from "../controllers/dealership.controller.js";

const dealershipRouter = express.Router();

dealershipRouter.post('/', dealershipController.createDealership);
dealershipRouter.post('/:id/users', dealershipController.assignUsers);
dealershipRouter.post('/:id/cars', dealershipController.assignCar);
dealershipRouter.post('/', dealershipController.getAllDealership);
dealershipRouter.get('/:id', dealershipController.viewDetails)

export default dealershipRouter;
