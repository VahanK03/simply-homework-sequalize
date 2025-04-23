import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    dealership_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'dealership',
            key: 'id',
        },
    },
}, { paranoid: true });

export default User;