// ENV vars we want, with default values, so we don't get everything on the host environment
const vs: any = {
  "NODE_ENV": "test",
  "HOST": "localhost",
  "PORT": "3000",
  "PUBLIC_URL": "",
  "COOKIE_SECRET": "00000000000000000000000000000000",
}


export function getEnv() {
  // our ENV obj
  const env: any = {}

  // get ENV from host or defaults
  for (const v in vs) {
    const val =  process.env[v]
    if (!!val) {
      env[v] = val
    } else {
      env[v] = vs[v]
    }
  }

  return env;

}