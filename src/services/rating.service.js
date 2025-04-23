import Rating from "../models/ratings.js";

class RatingService {
    async create(data) {
        const { car_id, user_id, rate } = data;
        return Rating.create({ car_id, user_id, rate });
    }
}

export default new RatingService();