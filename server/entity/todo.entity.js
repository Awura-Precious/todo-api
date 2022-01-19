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
    timestamp: {
			type: 'timestamp',
			default: () => 'CURRENT_TIMESTAMP',
		},
  },
});

module.exports = todoSchema;
