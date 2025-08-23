<script lang="ts">
  interface ProfileMenuProps {
    closeMenu: () => void;
  }

  let { closeMenu }: ProfileMenuProps = $props();

  function sendNotification(event: MouseEvent) {
    event.preventDefault();
    console.log('Notification sent!');
    closeMenu();
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