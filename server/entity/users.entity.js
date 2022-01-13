const { EntitySchema } = require("typeorm");
// const { password } = require("../ormconfig");

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
    // pass: {
    //     type:"char"
    // }
    // mail:{
    //     primary:true,

    // }
  },
});

module.exports = userSchema;
