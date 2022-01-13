const express = require('express');

const {addUser} = require('../controller/users.controller')

const router = express.Router();

router.post('/',addUser);

module.exports = router;