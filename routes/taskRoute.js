const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../utils/middleware");

router.get("/projects", authenticateToken, taskController.getProjects);
router.get("/designations", authenticateToken, taskController.getDesignations);
router.get("/statuses", authenticateToken, taskController.getStatuses);

module.exports = router;
