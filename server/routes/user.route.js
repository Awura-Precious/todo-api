const express = require('express');

const {addUser} = require('../controller/users.controller')

const router = express.Router();

//signing up a user
router.post('/',addUser);

module.exports = router;