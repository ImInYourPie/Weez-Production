const express = require("express");
const router = express.Router();
const questionController = require("../controller/question.controller");



router.get('/', (req, res) =>{
    
})

router.post('/create-question', questionController.createQuestion);

module.exports = router;