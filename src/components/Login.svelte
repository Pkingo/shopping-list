<script lang="ts">
  import { user } from '../stores/user';
  import { auth, provider } from '../config/firebase';

  const login = () => auth.signInWithRedirect(provider);
  const logout = () => auth.signOut().finally(user.logout)
</script>


<button on:click={$user ? logout : login} class="text-white">
  {$user ? "Logout" : "Login"}
</button>