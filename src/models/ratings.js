import {DataTypes} from 'sequelize';
import sequelize from  '../config/db.js';

const Rating = sequelize.define('rating', {
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0, max: 5 }
    },
}, {
    tableName: 'ratings',
    timestamps: false,
});

export default Rating;
