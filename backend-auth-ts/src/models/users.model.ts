// ----------------------------------------
// In-memory user "database"
// ----------------------------------------

export interface User {
    id: number;
    email: string;
    passwordHash: string;
    name: string | null;
}

let users: User[] = [];
let nextUserId = 1;

export function findUserByEmail(email: string): User | undefined {
    return users.find((u) => u.email === email);
}

export function findUserById(id: number): User | undefined {
    return users.find((u) => u.id === id);
}

interface CreateUserInput {
    email: string;
    passwordHash: string;
    name?: string;
}

export function createUser(input: CreateUserInput): User {
    const user: User = {
        id: nextUserId++,
        email: input.email,
        passwordHash: input.passwordHash,
        name: input.name ?? null,
    };

    users.push(user);
    return user;
}

export function getAllUsers(): User[] {
    return users;
}
