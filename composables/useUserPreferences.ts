import { ref } from 'vue';

const homepage = ref<string | null>(null);

export function useUserPreferences() {
  function setHomepage(path: string) {
    homepage.value = path;
    if (process.client) {
      localStorage.setItem('user-homepage', path);
    }
  }
  function getHomepage() {
    if (process.client) {
      return homepage.value || localStorage.getItem('user-homepage') || '/';
    }
    return homepage.value || '/';
  }
  return { homepage, setHomepage, getHomepage };
}
