import { db } from '../db';
import { type InsertUser, users } from '../schema';

export async function createUser(data: InsertUser) {
  await db.insert(users).values(data);
}
