// ----------------------------------------
// In-memory tasks, each belonging to a user by userId
// ----------------------------------------

// Store all tasks in an array
let tasks = [];

// Simple ID counter for tasks
let nextTaskId = 1;

// Create a new task for a given user
function createTask({ userId, title }) {
    const task = {
        id: nextTaskId++,   // task ID
        userId,             // the owner (user's id)
        title,
        completed: false,   // default: not completed
    };

    tasks.push(task);
    return task;
}

// Get all tasks that belong to specific user
function getTasksByUserId(userId) {
    return tasks.filter((t) => t.userId === userId);
}

module.exports = {
    createTask,
    getTasksByUserId,
};
