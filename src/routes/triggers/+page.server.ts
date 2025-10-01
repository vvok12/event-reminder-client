import { triggerApiRoute, triggerNowApiRoute } from '$lib/api/routes';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type TriggerData = {
    caldav_url: string;
    send_to_group: boolean;
    group_id: string;
    trigger_time: string;
}

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const { userId } = locals; 
    const response = await fetch(triggerApiRoute(userId));
    
    if (!response.ok) {
        return {
            userId, 
            triggerData: null
        }
    }

    const triggerData: TriggerData = await response.json();
    
    return { 
        userId,
        triggerData
    };
}

export const actions = {
    save: async ({ request, fetch, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries()) as unknown as TriggerData;

        if (!data) {
            return { success: false, message: 'Failed to save trigger settings.' };
        }

        if (!data.caldav_url || !data.trigger_time) {
            return { success: false, message: 'CalDav URL and Trigger Time are required.' };
        }

        if (data.send_to_group && !data.group_id) {
            return { success: false, message: 'Group ID is required when sending to group.' };
        }

        const response = await fetch(triggerApiRoute(locals.userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data})
        });

        if (!response.ok) {
            return { success: false, message: 'Failed to save trigger settings.' };
        }

        return { success: true, message: 'Trigger settings saved successfully.' };
    },
    triggerNow: async ({ locals, fetch }) => {
        const response = await fetch(triggerNowApiRoute(locals.userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            return { success: false, message: 'Failed to trigger now.' };
        }

        return { success: true, message: 'Triggered successfully.' };
    }
} satisfies Actions;