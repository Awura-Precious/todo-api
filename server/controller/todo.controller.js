const todoModel = require("../model/todo.model");

exports.addTodo = async (req, res) => {
  const { text, userId } = req.body;

  try {
    const response = await todoModel.save(text, userId);
    // console.log(response);
    res.status(200).send(response);
    return response;
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const response = await todoModel.getAll();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.getOneTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await todoModel.getOne(id);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.updateTodo = async (req, res) => {
  const { id, task } = req.body;

  try {
    const response = await todoModel.update(id, task);
    res.status(200).send({
      response,
      message: "success",
    });
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await todoModel.delete(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
