const { User, Designation, Project, Status, Task } = require("../models/index");
const { toNumber } = require("lodash");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: ["id", "name"],
      raw: true,
    });
    if (!projects) {
      return res
        .status(400)
        .json({ status: false, message: "No projects found" });
    }
    return res.status(200).json({ status: true, data: projects });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

exports.getDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll({
      attributes: ["id", "name"],
      raw: true,
    });
    if (!designations) {
      return res
        .status(400)
        .json({ status: false, message: "No designations found" });
    }

    return res.status(200).json({ status: true, data: designations });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

exports.getStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll({
      attributes: ["id", "name"],
      raw: true,
    });
    if (!statuses) {
      return res
        .status(400)
        .json({ status: false, message: "No designations found" });
    }

    return res.status(200).json({ status: true, data: statuses });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

exports.createTask = async (req, res) => {
  try {
    const {
      project_id,
      designation_id,
      task_details,
      start_date,
      estimate_hours,
      status_id,
      hour_taken,
      end_date,
      comments,
      attachment_url,
    } = req.body;

    const { user } = req;

    // Validate required fields
    if (
      !project_id ||
      !designation_id ||
      !task_details ||
      !start_date ||
      !estimate_hours ||
      !status_id
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the task in the database
    const newTask = await Task.create({
      project_id,
      designation_id,
      task_details,
      start_date,
      estimate_hours,
      status_id,
      hour_taken,
      end_date,
      comments,
      attachment_url,
      user_id: toNumber(user?.userId),
    });
    if (!newTask) {
      return res
        .status(500)
        .json({ status: false, message: "Error creating task" });
    }

    // Respond with the created task
    return res.status(200).json({
      status: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ status: false, message: "Internal server error", error: e });
  }
};

exports.getTaskByUser = async (req, res) => {
  try {
    const { user } = req;
    console.log(user?.userId);
    const tasks = await Task.findAll({
      where: { user_id: user?.userId },
      // include: ["User", "Designation", "Project", "Status"],
      include: [
        { model: User },
        { model: Project },
        { model: Designation },
        { model: Status },
      ],
      order: [["createdAt", "DESC"]],
    });
    if (!tasks) {
      return res.status(400).json({ message: "Not Found" });
    }
    return res.status(200).json({ user: user, tasks: tasks });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: {
        id: id,
      },
      include: [
        { model: User },
        { model: Project },
        { model: Designation },
        { model: Status },
      ],
    });
    if (!task) {
      return res.status(400).json({ message: "Not Found" });
    }
    return res.status(200).json({ task: task });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      designation_id,
      task_details,
      start_date,
      estimate_hours,
      status_id,
      hour_taken,
      end_date,
      comments,
      attachment_url,
    } = req.body;
    const { user } = req;
    if (
      !project_id ||
      !designation_id ||
      !task_details ||
      !start_date ||
      !estimate_hours ||
      !status_id
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedTask = await Task.update(
      {
        project_id,
        designation_id,
        task_details,
        start_date,
        estimate_hours,
        status_id,
        hour_taken,
        end_date,
        comments,
        attachment_url,
      },
      {
        where: {
          id: id,
        },
      },
    );
    if (!updatedTask) {
      return res
        .status(400)
        .json({ status: false, message: "Error Updating Task" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Task updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

exports.getTasksForAdmin = async (req, res) => {
  try {
    const { user } = req;
    // console.log(user);
    if (user?.user_role !== "Admin") {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized Access" });
    }
    const allTasks = await Task.findAll({
      include: [
        { model: User },
        { model: Project },
        { model: Designation },
        { model: Status },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ status: true, data: allTasks });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e });
  }
};
