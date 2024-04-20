import { PrismaClient } from '@prisma/client';
import {
  initialize,
  defineKurakkeFactory,
  defineKurakkeChildFactory,
} from './fabbrica';

const prisma = new PrismaClient();
initialize({ prisma });

const main = async () => {
  const kurakkeFactory = defineKurakkeFactory({
    defaultData: async ({ seq }) => {
      return {
        name: `Kurakke ${seq}`,
        description: `Description of Kurakke ${seq}`,
      };
    },
  });
  const kurakkeChildFactory = defineKurakkeChildFactory({
    defaultData: async ({ seq }) => {
      return {
        kurakke: kurakkeFactory,
        name: `KurakkeChild ${seq}`,
        description: `Description of KurakkeChild ${seq}`,
      };
    },
  });
  await kurakkeChildFactory.createList(10);
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
