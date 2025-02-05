# CF reproducer

# Need a KV & D1

KV as described in the docs for next caching

D1 database, update name in wrangler.json

You'll need to fill in names / ids for things in wrangler.json


```sh
yarn install

yarn prisma generate

yarn wrangler d1 migrations apply <db> --local/--remote


## Test cases for repro
# - /client-metadata.json
# - oauth login with atproto


# test locally with cloudflared tunnel to see it working (oauth requires https, client-metadata probably doesn't)
yarn dev

# deploy to workers to see it failing
yarn worker:deploy


```