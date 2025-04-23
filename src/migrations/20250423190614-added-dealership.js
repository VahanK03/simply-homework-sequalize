'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // 1. Create dealership table
        await queryInterface.createTable('dealership', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
            // No createdAt/updatedAt as per requirement
        });

        // 2. Create rating table
        await queryInterface.createTable('rating', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            car_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'cars',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            rate: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });

        // 3. Add dealership_id to users
        await queryInterface.addColumn('users', 'dealership_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'dealership',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });

        // 4. Add dealership_id to cars
        await queryInterface.addColumn('cars', 'dealership_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'dealership',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('car', 'dealership_id');
        await queryInterface.removeColumn('user', 'dealership_id');
        await queryInterface.dropTable('rating');
        await queryInterface.dropTable('dealership');
    }
};
