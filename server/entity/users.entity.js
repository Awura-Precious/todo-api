const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

const userSchema = new EntitySchema({
  name: "tbl_users",
  tableName: "tbl_users",
  columns: {
    id: {
      generated: true,
      type: "int",
      primary: true,
    },
    firstName: {
      type: "varchar",
    },
    lastName: {
      type: "varchar",
    },
    pass: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      // unique: true,
    },
    timestamp: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

module.exports = userSchema;
