import { DataTypes } from "sequelize";
import sequelize from "../config/persist/database.js";

const menu = sequelize.define(
  "MENU",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ingredient: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  {
    tableName: "MENU",
    indexes: [
      {
        name: "id",
        fields: ["id"],
      },
    ],
    transient: {
      count: 0,
    },
  }
);

// sequelize.sync().then().catch(e => console.log(e));

export default menu;
