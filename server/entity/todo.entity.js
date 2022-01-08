var { EntitySchema } = require("typeorm");

const todoSchema = new EntitySchema({
  name: "tbl_todos",
  tableName: "tbl_todos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    text: {
      type: "varchar",
    },
  },
});

module.exports = todoSchema;
