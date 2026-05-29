<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { isLoggedIn, isAdmin } from "$lib/auth";

  onMount(() => {
    const path = window.location.pathname;

    // ADMIN PROTECTION GLOBAL
    if (path.startsWith("/admin")) {
      if (!isLoggedIn()) {
        goto("/login");
        return;
      }

      if (!isAdmin()) {
        goto("/");
        return;
      }
    }
  });
</script>

<slot />