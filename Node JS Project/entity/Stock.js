import { DataTypes } from "sequelize";
import sequelize from "../config/persist/database.js";

const stock = sequelize.define(
  "STOCK",
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
    barcode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  },
  {
    tableName: "STOCK",
    indexes: [
      {
        name: "id",
        fields: ["id"],
      },
    ],
  }
);

// sequelize.sync().then().catch(e => console.log(e));

export default stock;
