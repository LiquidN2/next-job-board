import { faker } from '@faker-js/faker';

import { createEmployer, getRndEmployerId } from './queries/employer';
import { createJob } from '@/actions/jobsActions';

async function seedEmployers(numberOfEmployers: number) {
  if (numberOfEmployers <= 0) return;

  for (let i = 0; i < numberOfEmployers; i++) {
    await createEmployer({
      name: faker.company.name(),
    });
  }
}

async function seedJobs(numberOfJobs: number) {
  if (numberOfJobs <= 0) return;

  for (let i = 0; i < numberOfJobs; i++) {
    const employerId = await getRndEmployerId();
    if (!employerId) continue;

    await createJob({
      title: faker.person.jobType(),
      employerId,
      description: faker.lorem.paragraph(5),
      location: faker.location.city(),
      employmentType: 'Full-time',
      salary: faker.number.int({ min: 10000, max: 150000 }),
    });
  }
}

async function main() {
  console.log('⏳ DB seeding started...');
  await seedEmployers(50);
  await seedJobs(300);
  console.log('✅ DB seeding complete.');
}

main();
