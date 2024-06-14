import { faker } from '@faker-js/faker';

import { createJob } from './queries/job';
import { createUser } from './queries/user';
import { createEmployer, getRndEmployerId } from './queries/employer';

async function seedUsers() {
  console.log('⏳ Seeding user...');
  await createUser({
    name: 'John Doe',
    email: 'jdoe@example.com',
    password: 'password',
  });
  console.log('✅ User seeding completed.');
  console.log('------------------------------');
}

async function seedEmployers(numberOfEmployers: number) {
  if (numberOfEmployers <= 0) return;

  console.log('⏳ Seeding employers...');
  for (let i = 1; i <= numberOfEmployers; i++) {
    await createEmployer({
      name: faker.company.name(),
    });
    console.log(`✅ Seeded ${i}/${numberOfEmployers} employers`);
  }
  console.log('✅ Employers seeding completed.');
  console.log('------------------------------');
}

async function seedJobs(numberOfJobs: number) {
  if (numberOfJobs <= 0) return;

  console.log('⏳ Seeding jobs...');
  for (let i = 1; i <= numberOfJobs; i++) {
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

    console.log(`✅ Seeded ${i}/${numberOfJobs} jobs`);
  }
  console.log('✅ Jobs seeding completed.');
  console.log('------------------------------');
}

async function main() {
  console.log('⏳ DB seeding started...');
  await seedUsers();
  await seedEmployers(50);
  await seedJobs(300);
  console.log('✅ DB seeding completed');
}

main();
