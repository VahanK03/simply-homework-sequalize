import DealershipService from "../services/dealership.service.js";

class DealershipController {
    async createDealership(req, res) {
        const dealership = await DealershipService.create(req.body);
        res.status(201).json(dealership);
    }

    async assignUsers(req, res) {
        const {id} = req.params;
        const resp = await DealershipService.assignUsers(id, {...req.body});
        res.json(resp);
    }

    async assignCar(req, res) {
        const {id} = req.params;
        const resp = await DealershipService.assignCar(id, {...req.body});
        res.json(resp);
    }

    async getAllDealership(req, res) {
        const resp = await DealershipService.getAllDealership();
        res.json(resp);
    }

    async viewDetails(req, res) {
        const resp = await DealershipService.viewDetails({...req.body});
        res.json(resp);
    }
}

export default new DealershipController();