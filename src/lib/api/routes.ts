export const triggerApiRoute = (userId: string) => `/api/user/${userId}/triggers`;
export const triggerNowApiRoute = (userId: string, triggerId: string) => `/api/user/${userId}/trigger-now/${triggerId}`;

export const timezoneApiRoute = () => `/api/timezones`;