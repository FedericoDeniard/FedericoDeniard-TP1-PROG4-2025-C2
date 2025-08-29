import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthError,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../../../environments/environment'

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.anonKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn({ email, password }: { email: string, password: string }) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

  async register({ email, password, username }: { email: string, password: string, username: Profile['username'] }) {
    const { data, error } = await this.supabase.auth.signUp({
      email, password
    })
    if (error) {
      throw error
    }
    if (data.user) {
      await this.supabase.from('profiles').insert([{ id: data.user.id, username }])
    }
    return data
  }

  async getSessionAsync() {
    const { data } = await this.supabase.auth.getSession()
    this._session = data.session;
    return this._session;

  }
}

export const getSupabaseErrors = (error: AuthError) => {
  const status = error.status
  const errors = {
    400: "Credenciales inválidas",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
  }
  return typeof status === 'number' ? errors[status as keyof typeof errors] : error.message
}