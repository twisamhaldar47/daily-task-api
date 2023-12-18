const { User, Designation, Project } = require("../models/index");

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
