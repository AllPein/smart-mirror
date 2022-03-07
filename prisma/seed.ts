import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async () => {
  await prisma.user.create({
    data: {
      biometricData: ['super_data', 'super_data_2']    
    }
  });
};

const createSettings = async () => {
  await prisma.settings.create({
    data: {
      userId: '764e473f-9ef1-4246-bc78-ce0d5aa798a5',
      weather: true,
      currency: true,
      news: true
    }
  });
};

const main = async () => {
  // await createUser()
  await createSettings()
}

main().then(() => {
  prisma.$disconnect()
})
