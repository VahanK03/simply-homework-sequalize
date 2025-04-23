import Dealership from "../models/dealership.js";
import User from "../models/user.js";
import Car from "../models/car.js";
import sequelize from "../config/db.js";
import Make from "../models/make.js";
import Feature from "../models/feature.js";
import Rating from "../models/ratings.js";
import Model from "../models/model.js";

class DealershipService {
    async create(data) {
        const { name, address, description } = data
        return Dealership.create({ name, address, description });
    }

    async assignUsers(id, data) {
        const { userId } = data;
        const user = await User.findByPk(userId);
        if (!user) return { error: 'User not found' }
        user.dealership_id = id;
        await user.save();
        return user
    }

    async assignCar(id, data) {
        const { carId } = data;
        const car = await Car.findByPk(carId);
        if (!car) return { error: 'Car not found' }
        car.dealership_id = id;
        await car.save();
        return car
    }

    getAllDealership() {
        return Dealership.findAll({
            where: { isDeleted: false },
            include: [{ model: Car, attributes: [] }],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('cars.id')), 'carCount']
                ]
            },
            group: ['Dealership.id'],
            order: [[sequelize.literal('carCount'), 'DESC']]
        });
    }

    async viewDetails(id) {
        const dealership = await Dealership.findOne({
            where: { id, isDeleted: false },
            include: [
                {
                    model: User,
                    attributes: ['username', 'email'],
                },
                {
                    model: Car,
                    include: [
                        { model: Make },
                        { model: Model },
                        { model: Feature },
                        {
                            model: Rating,
                            include: [{ model: User, attributes: ['username'] }]
                        }
                    ]
                }
            ]
        });
        if (!dealership) return { error: 'Not found' }

        const formatted = dealership.toJSON();
        formatted.cars = formatted.cars.map(car => {
            const avgRating = car.ratings.length
                ? car.ratings.reduce((sum, r) => sum + r.rate, 0) / car.ratings.length
                : null;
            return {
                ...car,
                averageRating: avgRating,
                ratings: car.ratings.map(r => ({
                    username: r.user.username,
                    rate: r.rate,
                })),
            };
        });

    }
}

export default new DealershipService();