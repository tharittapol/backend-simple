// ------------------------------------------------------
// User "model" for backend-auth-ts using Prisma
// - This file used to manage an in-memory array of users.
// - Now it uses PostgreSQL via Prisma Client.
// ------------------------------------------------------

import { prisma } from '../prisma';
import type { User } from '@prisma/client';

let users: User[] = [];
let nextUserId = 1;

// Find a user by email (used in login + register)
export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Find a user by ID (used in /users/me)
export async function findUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}
// Input type for createUser
interface CreateUserInput {
  email: string;
  passwordHash: string;
  name?: string;
}

// Create a new user row in the DB
export async function createUser(input: CreateUserInput): Promise<User> {
  return prisma.user.create({
    data: {
      email: input.email,
      passwordHash: input.passwordHash,
      // if name is undefined, store null
      name: input.name ?? null,
    },
  });
}

// Get all users (for /users endpoint)
// decides what to send back to the client.
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany({
    orderBy: { id: 'asc' },
  });
}
