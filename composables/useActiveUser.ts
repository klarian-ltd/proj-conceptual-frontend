import type { User } from '~/types/user';
import type { Ref } from 'vue';

export function useActiveUser() {
  const { user, ...rest } = useUserSession();
  return {
    user: user as Ref<User | null>,
    ...rest,
  };
}
