import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getClient as getPrismaClient } from '@/lib/db'
import { getClient as getAtprotoClient } from '@/lib/atproto/oauth/client'

type Session = { did: string }

export async function GET(req: NextRequest) {
  const publicUrl = process.env.PUBLIC_URL;
  const url = publicUrl || `https://dev.verdverm.com`;

  // console.log("callback|req:", req)
  const params = new URLSearchParams(req.url.split('?')[1])
  try {

    const env = getCloudflareContext().env
    console.log("/oauth/callback.env", env)
    const db = getPrismaClient(env)
    const at = getAtprotoClient(db)

    const cs = await cookies()
    const { session } = await at.callback(params)
    const clientSession = await getIronSession<Session>(cs, {
      cookieName: 'sid',
      password: env.COOKIE_SECRET,
    })

    // hmmm?
    // assert(!clientSession.did, 'session already exists')

    clientSession.did = session.did
    await clientSession.save()

    // todo, upsert user_table (here or in storage.ts?)

    let sc = cs.toString()
    if (process.env.NODE_ENV === "development") {
      sc = sc.replace("Secure; ", "")
    }
    // console.log(sc)

    // todo, get the page based on query params
    return new Response("ok", {
      status: 303,
      headers: { 
        'Set-Cookie': sc,
        'Location': url,
      }
    })
  } catch (err) {
    console.error({ err }, 'oauth callback failed')
    return NextResponse.redirect(url + '/sign-in?error=oauth-failed')
  }
}