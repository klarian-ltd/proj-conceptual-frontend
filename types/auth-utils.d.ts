// types/auth-utils.d.ts
import type { User } from './user';

declare module 'nuxt-auth-utils' {
  interface UserSession {
    user?: User;
    // add other session fields if needed
  }
}
