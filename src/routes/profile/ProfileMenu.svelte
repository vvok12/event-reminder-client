<script lang="ts">
	import { sendNotificationApiRoute } from "./types";

  interface ProfileMenuProps {
    closeMenu: () => void;
  }

  let { closeMenu }: ProfileMenuProps = $props();

  function sendNotification(event: MouseEvent) {
    event.preventDefault();
    closeMenu();

    fetch(sendNotificationApiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
</script>

<button class="menu-item" onclick={sendNotification}>
  Send notification
</button>
<button class="menu-item">
  Log out
</button>

<style>
    .menu-item {
        display: block;
    }
</style>