<script lang="ts">
  import { user } from '../stores/user';
  import { auth, provider } from '../config/firebase';

  function login() {
    auth.signInWithPopup(provider).then(result => user.login(result.user)).catch(user.logout);
  }
  function logout()  {
    auth.signOut().finally(user.logout)
  }
</script>


{#if $user}
  <button on:click={logout} class="block mt-4 md:inline-block md:mt-0 text-white">
    Logout
  </button>
{:else}
  <button on:click={login} class="block mt-4 md:inline-block md:mt-0 text-white">
    Login
  </button>
{/if}