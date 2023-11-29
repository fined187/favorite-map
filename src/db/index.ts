import { PrismaClient } from '@prisma/client';

const PrismaClientSigleton = () => {
  return new PrismaClient();
};

type PrismaClientSigleton = ReturnType<typeof PrismaClientSigleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSigleton | undefined;
};

const prisma = globalForPrisma.prisma ?? PrismaClientSigleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}