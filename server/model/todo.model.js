const { getRepository } = require("typeorm"); //getRepository helps to perform crudoperations on a particular entity

const todoSchema = require("../entity/todo.entity");

//todo:add, getone , get all, update, delete;
//async
//here the system designed functions come

//type orm to perform crud operations

//adding a todo
exports.save = async (text, userId) => {
  const todoList = getRepository(todoSchema);
  const result = await todoList.save({ text, userId });
  console.log(result)
  return result;
};

//get all todos
exports.getAll = async () => {
  const todoList = getRepository(todoSchema);
  const result = await todoList.find();
  return result;
};

//get one todo
exports.getOne = async (id) => {
  const todoList = getRepository(todoSchema);
  const result = await todoList.findOne(id);
  return result;
};

//updating a todo
exports.update = async (id, text) => {
  const todoList = getRepository(todoSchema);
  const result = await todoList.update({ id: id }, { text: text });
  return result;
};

//deleting a todo
exports.delete = async (id) => {
  const todoList = getRepository(todoSchema);
  const result = await todoList.delete(id);
  return result;
};
