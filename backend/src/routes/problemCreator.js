const express = require('express')
const adminMiddleware = require("../middlewares/adminMiddleware")
const userMiddleware = require("../middlewares/userMiddleware")
const problemRouter = express.Router()
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,submittedProblem,solvedAllProblembyUser} = require('../controllers/userProblem')
const { get } = require('mongoose')
problemRouter.post("/create",adminMiddleware,createProblem)
problemRouter.put("/update/:id",adminMiddleware,updateProblem)
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem)

problemRouter.get("/problemById/:id",userMiddleware,getProblemById)
problemRouter.get("/getAllProblem",userMiddleware, getAllProblem);
problemRouter.get("/problemSolvedByUser",userMiddleware, solvedAllProblembyUser);
problemRouter.get("/submittedProblem/:pid",userMiddleware, submittedProblem);

// problemRouter.get("/user", solvedProblem);

module.exports = problemRouter