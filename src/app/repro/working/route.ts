import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from '@prisma/adapter-d1'

export async function GET(req: NextRequest) {
  // Get handles to storage
	const env = getCloudflareContext().env

  const result = await env.DB.prepare("SELECT * from 'user'").run();

  console.log(result)

  return NextResponse.json(result)
}
