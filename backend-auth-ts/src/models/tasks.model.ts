// ------------------------------------------------------
// Task "model" using Prisma
// - Responsible only for DB operations for tasks
// ------------------------------------------------------


import { prisma } from '../prisma';
import type { Task } from '@prisma/client';

let tasks: Task[] = [];
let nextTaskId = 1;

// Input type for creating a task
interface CreateTaskInput {
  userId: number;
  title: string;
}

// Create a new task for a given user
export async function createTask(input: CreateTaskInput): Promise<Task> {
  return prisma.task.create({
    data: {
      userId: input.userId,
      title: input.title,
    },
  });
}

// Get all tasks belonging to a specific user
export async function getTasksByUserId(userId: number): Promise<Task[]> {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { id: 'asc' },
  });
}

// Update a task (only if it belongs to this user)
export async function updateTaskForUser(
  taskId: number,
  userId: number,
  // Pick<T, K> = take only some fields from a type
  // Partial<T> = make all properties optional
  // An object that may have title, or completed, or both, or even neither
  data: Partial<Pick<Task, 'title' | 'completed'>>
): Promise<Task | null> {
  // Enforce userId in the filter so user cannot update others' tasks.
  const updated = await prisma.task.updateMany({
    where: { id: taskId, userId },
    data,
  });

  // If no rows were updated, return null
  if (updated.count === 0) return null;

  // Re-fetch the updated row
  return prisma.task.findUnique({ where: { id: taskId } });
}

// Delete a task owned by given user
export async function deleteTaskForUser(
  taskId: number,
  userId: number
): Promise<boolean> {
  const deleted = await prisma.task.deleteMany({
    where: { id: taskId, userId },
  });

  return deleted.count > 0;
}
