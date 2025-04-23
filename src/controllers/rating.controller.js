import RatingService from "../services/rating.service.js";

class RatingController {
    async create(req, res) {
        const resp = await RatingService.create({...req.body});
        res.json(resp);
    }
}

export default new RatingController();