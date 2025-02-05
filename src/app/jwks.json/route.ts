export const dynamic = 'force-dynamic' // defaults to auto

import { NextRequest, NextResponse } from 'next/server'
import { getClient } from "@/lib/atproto/oauth/client"

export async function GET(request: NextRequest) {
  return NextResponse.json(getClient(null).jwks)
}