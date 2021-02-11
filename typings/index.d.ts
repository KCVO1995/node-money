import 'egg';
import 'egg-jwt'

declare module 'egg' {

}

type User = {
  username: string
  password_digest: string
  createdAt: Date
  updatedAt: Date
}
