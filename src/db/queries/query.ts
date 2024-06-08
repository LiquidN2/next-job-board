import { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';

import { db } from '../db';
import { jobs } from '../schema/job';

abstract class Query {
  protected db = db;

  constructor(private table: SQLiteTableWithColumns<any>) {}

  public async create(data: any) {
    await this.db.insert(this.table).values(data);
  }
}

class Job extends Query {
  constructor() {
    super(jobs);
  }
}

export const job = new Job();
