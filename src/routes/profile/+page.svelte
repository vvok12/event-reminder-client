<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	export let data: ProfileData;
    
    interface ProfileData {
        id: string;
        username: string;
        phone_number?: string;
        signal_group_id?: string;
        preferred_trigger_time: string;
        timezone: string;
    }

    const profileApiRoute = "/api/profile";

	onMount(async () => {
		const res = await fetch(profileApiRoute, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		data = await res.json();
	});

    async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
        		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		//applyAction(result);
    }
</script>

<h1>User Profile</h1>

<form method="POST" action={profileApiRoute} onsubmit={handleSubmit}>
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
        <option value="UTC">UTC</option>
        <option value="+01:00">UTC+01:00</option>
        <option value="+02:00">UTC+02:00</option>
        <option value="+03:00">UTC+03:00</option>
        <option value="+04:00">UTC+04:00</option>
        <option value="+05:00">UTC+05:00</option>
        <option value="+06:00">UTC+06:00</option>
        <option value="+07:00">UTC+07:00</option>
        <option value="+08:00">UTC+08:00</option>
        <option value="+09:00">UTC+09:00</option>
        <option value="+10:00">UTC+10:00</option>
        <option value="+11:00">UTC+11:00</option>
        <option value="+12:00">UTC+12:00</option>
        <option value="+13:00">UTC+13:00</option>
        <option value="+14:00">UTC+14:00</option>
        <option value="-01:00">UTC-01:00</option>
        <option value="-02:00">UTC-02:00</option>
        <option value="-03:00">UTC-03:00</option>
        <option value="-04:00">UTC-04:00</option>
        <option value="-05:00">UTC-05:00</option>
        <option value="-06:00">UTC-06:00</option>
        <option value="-07:00">UTC-07:00</option>
        <option value="-08:00">UTC-08:00</option>
        <option value="-09:00">UTC-09:00</option>
        <option value="-10:00">UTC-10:00</option>
        <option value="-11:00">UTC-11:00</option>
        <option value="-12:00">UTC-12:00</option>
        <option value="-13:00">UTC-13:00</option>
        <option value="-14:00">UTC-14:00</option>
    </select>

    <input type="submit" value="Update Profile" />
</form>


<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: left;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background-color: var(--color-background);
	}

	label {
		font-weight: bold;
	}

	input, select {
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		width: 100%;
	}

	input[type="submit"] {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: var(--color-theme-2);
		border: none;
		border-radius: 8px;
		cursor: pointer;
        font-weight: bold;
	}
</style>