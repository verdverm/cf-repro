import { NodeOAuthClient } from '@atproto/oauth-client-node'
import { JoseKey } from '@atproto/jwk-jose'
import { SessionStore, StateStore } from './storage'

// convenience name
const enc = encodeURIComponent;

// for dynamic jwks.json
async function loadKeyset() {
  return Promise.all([
    JoseKey.fromImportable(process.env.PRIVATE_KEY_1),
    JoseKey.fromImportable(process.env.PRIVATE_KEY_2),
    // JoseKey.fromImportable(process.env.PRIVATE_KEY_3),
  ])
}

export function getClient(db: any) {
  // info about running server
  const publicUrl = process.env.PUBLIC_URL;
  const url = publicUrl || 'https://tunnel.blebbit.dev';
  const client_id = url + "/client-metadata.json";


  return new NodeOAuthClient({
    // This object will be used to build the payload of the /client-metadata.json
    // endpoint metadata, exposing the client metadata to the OAuth server.
    clientMetadata: {
      // Must be a URL that will be exposing this metadata
      // client_name: 'verdverm',
      // client_id: url + '/client-metadata.json',
      client_name: 'verdverm',
      client_id: client_id,
      client_uri: url,
      // logo_uri: url + '/logo.png',
      tos_uri: url + '/tos',
      policy_uri: url + '/policy',
      redirect_uris: [`${url}/oauth/callback`],
      scope: 'atproto transition:generic',
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      application_type: 'web',
      dpop_bound_access_tokens: true,

      token_endpoint_auth_method: 'none',
      // token_endpoint_auth_method: 'private_key_jwt',
      // token_endpoint_auth_signing_alg: 'ES256',
      // jwks_uri: url + '/jwks.json',
    },

    // stores for auth
    stateStore: new StateStore(db),
    sessionStore: new SessionStore(db),

    // Used to authenticate the client to the token endpoint. Will be used to
    // build the jwks object to be exposed on the "jwks_uri" endpoint.
    // keyset: await loadKeyset(),

    // A lock to prevent concurrent access to the session store. Optional if only one instance is running.
    // requestLock,
  })
}