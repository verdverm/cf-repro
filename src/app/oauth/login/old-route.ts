import { NextRequest, NextResponse } from 'next/server';
import { OAuthResolverError } from '@atproto/oauth-client-node'
import { isValidHandle } from '@atproto/syntax'
import { TID } from '@atproto/common'
import { Agent } from '@atproto/api'
// import { client } from "@/lib/atproto/oauth/client";

import { getIronSession } from 'iron-session';

import { env } from '@/lib/env';

import { client as atprotoOauthClient } from '@/lib/atproto/oauth/client'

type Session = { did: string }

// // Application state passed to the router and elsewhere
// export type AppContext = {
//   db: Database
//   ingester: Firehose
//   logger: pino.Logger
//   oauthClient: OAuthClient
//   resolver: BidirectionalResolver
// }

// Helper function to get the Atproto Agent for the active session
async function getSessionAgent(
  req: NextRequest,
  res: NextResponse,
  // ctx: AppContext,
  ctx: any,
) {
  const session = await getIronSession<Session>(req, res, {
    cookieName: 'sid',
    password: env.COOKIE_SECRET,
  })
  if (!session.did) return null
  try {
    const oauthSession = await atprotoOauthClient.restore(session.did)
    return oauthSession ? new Agent(oauthSession) : null
  } catch (err) {
    console.log('oauth restore failed', err.stack)
    await session.destroy()
    return null
  }
}

export async function POST(req: NextRequest) {
  // console.log("req:", req)
  const data = await req.json()
  // console.log(data)

  // Validate
  const handle = data.handle
  if (typeof handle !== 'string' || !isValidHandle(handle)) {
    return NextResponse.json({error: "invalid handle"})
  }

  // Initiate the OAuth flow
  try {
    const url = await atprotoOauthClient.authorize(handle, {
      scope: 'atproto transition:generic',
    })
    return NextResponse.json({ redirect: url.toString() })
  } catch (err) {
    // console.log('oauth authorize failed', err)
    // console.log(err.stack, err.message)
    return NextResponse.json({error: "oauth authorize failed", details: err, message: err.message})
  }
}
