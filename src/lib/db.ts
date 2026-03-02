import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const prismaClientSingleton = () => {
    const connectionString = (process.env.DATABASE_URL || process.env.DIRECT_URL)?.trim()

    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined in environment variables.')
    }

    // PrismaNeon takes a PoolConfig directly (not a Pool instance)
    // The adapter creates the pool internally from this config
    const adapter = new PrismaNeon({ connectionString })
    return new PrismaClient({ adapter } as any)
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
