// ----------------------------------------
// Tasks controller
// - GET /tasks          → list tasks for logged-in user
// - POST /tasks         → create task for logged-in user
// ----------------------------------------

const {
    createTask,
    getTasksByUserId,
} = require("../models/tasks.model");

// GET /tasks
// Returns tasks of the current user (requires authJwt)
function listMyTasks(req, res, next) {
    try {
        const userId = req.user.id; // from authJwt
        const tasks = getTasksByUserId(userId);

        res.json({
            count: tasks.length,
            tasks,
        });
    } catch (e) {
        return next(e);
    }
}

// POST /tasks
// Body: { title }
// Creates a task for the current user
function createMyTask(req, res, next) {
    try {
        const userId = req.user.id; // from authJwt
        const { title } = req.body;

        // Simple validation
        if (!title) {
            const err = new Error("title is required");
            err.statusCode = 400;
            return next(err);
        }

        const task = createTask({ userId, title });

        res.status(201).json(task);
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    listMyTasks,
    createMyTask,
};
