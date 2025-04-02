import { NextRequest, NextResponse } from 'next/server';
import { isValidHandle } from '@atproto/syntax'

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getClient as getPrismaClient } from '@/lib/db'
import { getClient as getAtprotoClient } from '@/lib/atproto/oauth/client'

export async function POST(req: NextRequest) {
  const data = await req.json()

  // Validate
  const handle = data.handle
  if (typeof handle !== 'string' || !isValidHandle(handle)) {
    return NextResponse.json({error: "invalid handle"})
  }

	const env = getCloudflareContext().env
  console.log("/oauth/login.env", env)
  const db = getPrismaClient(env)
  const at = getAtprotoClient(db)

  console.log("GOT HERE")

  // Initiate the OAuth flow
  try {
    const url = await at.authorize(handle, {
      scope: 'atproto transition:generic',
    })
    return NextResponse.json({ redirect: url.toString() })
  } catch (err) {
    console.log("ERROR:", err)
    return NextResponse.json({error: "oauth authorize failed", details: err, message: err.message})
  }
}