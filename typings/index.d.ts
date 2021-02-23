import 'egg';
import 'egg-jwt';

declare module 'egg' {

}

type User = {
  id: number,
  username: string
  password_digest: string
  createdAt: Date
  updatedAt: Date
  created_at: Date
  updated_at: Date
}
