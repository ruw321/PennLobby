const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");


router.route("/").get(catchAsync(users.createUser));
// router.post("/", catchAsync(users.createUser));

router.route("/").get(catchAsync(users.getUsers));

router.route("/:id").get(catchAsync(users.getUser));

router.route("/:id").get(catchAsync(users.updateUser));
// put

router.route("/:id").get(catchAsync(users.deleteUser));
// delete

module.exports = router;
