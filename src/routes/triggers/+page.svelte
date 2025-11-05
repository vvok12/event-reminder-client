<script lang="ts">
    const { data, form } = $props();
    let sendToGroup = $derived(data.triggerData?.send_to_group || false);
</script>

<h1>Triggers</h1>

<form method="POST" action="?/save">
    <input type="hidden" name="id" value={data.triggerData?.id} />  

    <label for="caldav_url">CalDav URL:</label>
	<input type="url" name="caldav_url" value={data.triggerData?.caldav_url} />
    
    <label for="trigger_time">Trigger Time:</label>
    <input type="time" name="trigger_time" value={data.triggerData?.trigger_time} />

    <label for="send_to_group">Send to group:</label>
    <input type="checkbox" name="send_to_group" bind:checked={sendToGroup} />

    {#if sendToGroup}
        <label for="group_id">Group ID:</label>
        <input type="text" name="group_id" value={data.triggerData?.group_id} />
    {/if}

    {#if !form?.success && form?.message}
        <p class="error">{form.message}</p>
    {/if}

    <input type="submit" value="Update" />
    <button formaction="?/triggerNow">Trigger Now</button>
</form>