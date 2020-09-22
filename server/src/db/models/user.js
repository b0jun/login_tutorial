"use strict";
const dotenv = require("dotenv");
const crypto = require("crypto");
const { Model } = require("sequelize");

dotenv.config();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (data, option) => {
          let shasum = crypto.createHmac("sha512", process.env.SECRET_KEY);
          shasum.update(data.password);
          data.password = shasum.digest("hex");
        },
        beforeFind: (data, option) => {
          if (data.where.password) {
            let shasum = crypto.createHmac("sha512", process.env.SECRET_KEY);
            shasum.update(data.where.password);
            data.where.password = shasum.digest("hex");
          }
        },
      },
      sequelize,
      modelName: "User",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return User;
};
