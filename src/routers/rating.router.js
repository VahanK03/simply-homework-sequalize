import express from 'express';

import RatingController from "../controllers/rating.controller.js";

const ratingRouter = express.Router();

ratingRouter.post('/', RatingController.create);

export default ratingRouter;