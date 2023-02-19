const router = require('express').Router();
const userRoutes = require("./userRoutes")
const noteRoutes = require("./noteRoutes")
const todoRoutes = require("./todoRoutes")

router.use("/users", userRoutes)
router.use("/notes", noteRoutes)
router.use("/todos", todoRoutes)

module.exports = router