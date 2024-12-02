const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});


const Pdf = sequelize.define("Pdf", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    filename: { type: DataTypes.STRING, allowNull: false },
    s3Url: { type: DataTypes.STRING, allowNull: false },
    uploadDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

// Export `sequelize` and all models
module.exports = { sequelize, Pdf, User};
