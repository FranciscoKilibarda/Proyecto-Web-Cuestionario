
const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/exam.controller');

router.get('/', ExamController.getAll);

module.exports = router;
