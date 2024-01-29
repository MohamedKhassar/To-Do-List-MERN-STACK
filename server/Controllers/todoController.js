const TodoModel = require("../models/TodoModel");
const handelErrors = (err) => {
  const errors = {
    title: "",
    priority: "",
    created_by: "",
    deadline: "",
  };
  if (err.errors) {
    Object.values(err.errors).forEach((error) => {
      if (error.message.includes("Cast to date failed for value")) {
        errors.deadline = "please enter a valid date";
      } else {
        errors[error.path] = error.message;
      }
    });
  }
  return errors;
};

const Controller = {
  postTask: async (req, res) => {
    try {
      await TodoModel.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        created_by: req.body.created_by,
        deadline: req.body.deadline,
      });
      res.status(201).json("created");
    } catch (err) {
      const error = handelErrors(err);
      res.json(error);
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const result = await TodoModel.find({ delete_at: null });
      res.json(result);
    } catch (err) {
      console.log(err.message);
    }
  },
  getTaskByID: async (req, res) => {
    try {
      const result = await TodoModel.find(req.params.id);
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }
  },
  updateTask: async (req, res) => {
    try {
      await TodoModel.findByIdAndUpdate(req.params.id, req.body);
    } catch (err) {
      console.log(err.message);
    }
  },
  deleteTask: async (req, res) => {
    try {
      await TodoModel.findByIdAndUpdate(req.params.id, {
        delete_at: new Date().toISOString(),
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = Controller;
