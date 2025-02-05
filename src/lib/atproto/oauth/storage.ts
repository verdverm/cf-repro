import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from '@atproto/oauth-client-node'

export class StateStore implements NodeSavedStateStore {
  constructor(private db: any) {}

  async get(key: string): Promise<NodeSavedState | undefined> {
    const result = await this.db.oauth_state.findUnique({
      where: {
        key: key,
      }
    })
    if (!result) return
    return JSON.parse(result.state) as NodeSavedState
  }

  async set(key: string, val: NodeSavedState) {
    const state = JSON.stringify(val)
    await this.db.oauth_state.create({
      data: {
        key: key,
        state: state,
      }
    })
  }

  async del(key: string) {
    await this.db.oauth_state.delete({
      where:{
        key,
      }
    })
  }
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: any) {}

  async get(key: string): Promise<NodeSavedSession | undefined> {
    const result = await this.db.oauth_session.findUnique({
      where: {
        key: key,
      }
    })
    if (!result) return
    return JSON.parse(result.session) as NodeSavedSession
  }

  async set(key: string, val: NodeSavedSession) {
    const session = JSON.stringify(val)
    await this.db.oauth_session.create({
      data: {
        key,
        session,
      }
    })
  }

  async del(key: string) {
    await this.db.oauth_session.delete({
      where:{
        key,
      }
    })
  }
}
