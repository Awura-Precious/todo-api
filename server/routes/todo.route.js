const express = require("express");

// importing controllers
const { addTodo,
        getAllTodo,
        getOneTodo,
        updateTodo,
        deleteTodo
     } = require("../controller/todo.controller");

// const app =express();  
const router = express.Router();

//routers           
router.post("/", addTodo);

router.get('/',getAllTodo);

router.get('/:id', getOneTodo);

router.put('/', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router;
