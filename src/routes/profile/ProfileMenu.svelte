<script lang="ts">
    function sendNotification(event: MouseEvent) {
        event.preventDefault();
        console.log('Notification sent!');
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