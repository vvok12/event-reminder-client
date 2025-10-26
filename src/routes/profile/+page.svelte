<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { profileApiRoute } from './types';

	const { data: pageLoadData } = $props();
	const { userId, timezones } = pageLoadData;
	
	let data: ProfileData = $state({
		id: '',
		username: '',
		phone_number: '',
		signal_group_id: '',
		preferred_trigger_time: '12:00',
		timezone: 'Etc/UTC'
	});

    interface ProfileData {
        id: string;
        username: string;
        phone_number?: string;
        signal_group_id?: string;
        preferred_trigger_time: string;
        timezone: string;
    }

    
	onMount(async () => {
		console.log("fetching profile %s", userId);
		const res = await fetch(profileApiRoute(userId), {
			headers: {
				'Content-Type': 'application/json',
				"Accept": "application/json"
			}
		});
		data = await res.json();
	});

    async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
        		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		//applyAction(result);
    }
</script>

<h1>Your Profile</h1>

<form method="POST" action={profileApiRoute(userId)} onsubmit={handleSubmit}>
    <label for="id">ID:</label>
	<input type="text" name="id" value={data?.id} readonly/>

    <label for="username">Username:</label>
	<input type="text" name="username" value={data?.username} />

    <label for="phone_number">Phone number:</label>
	<input type="phone" name="phone_number" value={data?.phone_number} />

    <label for="signal_group_id">Signal group ID:</label>
	<input type="text" name="signal_group_id" value={data?.signal_group_id} />

    <label for="preferred_trigger_time">Preferred Trigger Time:</label>
    <input type="time" name="preferred_trigger_time" value={data?.preferred_trigger_time} />

    <label for="timezone">Timezone:</label>
    <select name="timezone" value={data?.timezone}>
        {#each timezones as tz}
            <option value={tz} selected={tz === data?.timezone}>{tz}</option>
        {/each}
    </select>

    <input type="submit" value="Update Profile" />
</form>
