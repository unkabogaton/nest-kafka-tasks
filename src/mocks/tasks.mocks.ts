import { faker } from '@faker-js/faker';

export const generateMockTasks = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: Math.floor(Math.random() * 10000),
    title: faker.lorem.sentence(),
    notes: faker.lorem.paragraph(),
    userId: Math.floor(Math.random() * 3) + 1,
  }));
};
