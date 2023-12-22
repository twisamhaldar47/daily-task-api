const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../utils/middleware");

router.get("/projects", authenticateToken, taskController.getProjects);
router.get("/designations", authenticateToken, taskController.getDesignations);
router.get("/statuses", authenticateToken, taskController.getStatuses);
router.post("/create", authenticateToken, taskController.createTask);
router.get("/getTaskByUser", authenticateToken, taskController.getTaskByUser);
router.get("/getTaskById/:id", authenticateToken, taskController.getTaskById);
router.post("/editTask/:id", authenticateToken, taskController.editTask);
router.get(
  "/getTaskAsAdmin",
  authenticateToken,
  taskController.getTasksForAdmin,
);
router.post("/deleteTask/:id", authenticateToken, taskController.deleteTask);

module.exports = router;
