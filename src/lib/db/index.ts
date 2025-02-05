export const dynamic = 'force-dynamic' // defaults to auto

import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from '@prisma/adapter-d1'

export function getClient(env: any) {
  return new PrismaClient({
    adapter: new PrismaD1(env.DB)
  });
}