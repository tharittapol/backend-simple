// ----------------------------------------
// In-memory tasks for users
// ----------------------------------------

export interface Task {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

let tasks: Task[] = [];
let nextTaskId = 1;

interface CreateTaskInput {
    userId: number;
    title: string;
}

export function createTask(input: CreateTaskInput): Task {
    const task: Task = {
        id: nextTaskId++,
        userId: input.userId,
        title: input.title,
        completed: false,
    };

    tasks.push(task);
    return task;
}

export function getTasksByUserId(userId: number): Task[] {
    return tasks.filter((t) => t.userId === userId);
}
