<script lang="ts">
	import { sendNotificationApiRoute } from "./types";

  interface ProfileMenuProps {
    closeMenu: () => void;
    userId: string;
  }

  const { closeMenu, userId }: ProfileMenuProps = $props();

  function sendNotification(event: MouseEvent) {
    event.preventDefault();
    closeMenu();

    fetch(sendNotificationApiRoute(userId), {
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