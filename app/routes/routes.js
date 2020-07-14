const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService')


transactionRouter.get('/', service.getAll)






module.exports = transactionRouter;
