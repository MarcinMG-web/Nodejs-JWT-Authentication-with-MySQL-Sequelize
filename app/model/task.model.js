module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        done: {
            type: Sequelize.BOOLEAN
        },
		content: {
            type: Sequelize.TEXT
        },
        priority: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        }

    });

    return Task;
}
