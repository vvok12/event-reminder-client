import { timezoneApiRoute } from "$lib/api/routes";

export async function load({ locals, fetch }) {
    const response = await fetch(timezoneApiRoute());
    
    return { 
        userId: locals.userId, 
        timezones: await response.json() 
    };
}