const sequelize = require("../config/connection");
const { User, Todo, Note } = require("../models");

const userData = require("./userData.json");
const noteData = require("./noteData.json");
const todoData = require("./todoData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const note of noteData) {
        await Note.create({
            ...note,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            date_created: Date.now()
        });
    }

    for (const todo of todoData) {
        await Todo.create({
            ...todo,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            date_created: Date.now()
        });
    }

    process.exit(0);
};

seedDatabase();
