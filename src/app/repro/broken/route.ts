import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from '@prisma/adapter-d1'

export async function GET(req: NextRequest) {
  // Get handles to storage
	const env = getCloudflareContext().env
  const db = new PrismaClient({
    adapter: new PrismaD1(env.DB)
  });

  let user: any = null

  // Find or create user
  user = await db.user.findUnique({
    where: { handle: "verdverm.com" },
    select: { id: true, handle: true, did: true }
  })

  return NextResponse.json(user || [])
}