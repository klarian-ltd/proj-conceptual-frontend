export default defineNuxtPlugin(async (nuxtApp) => {
  // useUserSession is auto-imported by Nuxt Auth Utils
  const { loggedIn, user, session, fetch } = useUserSession();

  if (process.client) {
    // Optionally, you can log session state for debugging
    fetch().then(() => {
      if (loggedIn.value) {
        console.log('User session restored:', user.value);
      } else {
        console.log('No user session found.');
      }
    });
  }
});
