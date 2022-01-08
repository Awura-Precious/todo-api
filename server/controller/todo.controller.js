const todoModel = require("../model/todo.model");

exports.addTodo = async (req, res) => {
  const { task } = req.body;

  try {
    const response = await todoModel.save(task);
    res.send(response);
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const response = await todoModel.getAll();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

exports.getOneTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await todoModel.getOne(id);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = async (req, res) => {
  const { id, task } = req.body;
  
  try {
    const response = await todoModel.update(id, task);
    res.send("success");
    res.send(response);

  } catch (error) {
    res.send(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await todoModel.delete(id);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};
