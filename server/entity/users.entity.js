const { EntitySchema } = require("typeorm");

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
    },
  },
});

module.exports = userSchema;
