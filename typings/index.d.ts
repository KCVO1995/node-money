import 'egg';
import 'egg-jwt'

declare module 'egg' {

}

type User = {
  id: number,
  username: string
  password_digest: string
  created_at: Date
  updated_at: Date
}
