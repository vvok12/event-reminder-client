import type { Handle, RequestEvent } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { toBase64 } from '$lib/scripts/server.utils';

const authMiddleware = async ( event: RequestEvent ) => {
	const user = event.request.headers.get('x-forwarded-user');
	const email = event.request.headers.get('x-forwarded-email');

	event.locals.user = user;
	event.locals.email = email
	event.locals.userId = toBase64(email || user || 'unauthenticated');
}

export const handle: Handle = async ({ event, resolve }) => {
	authMiddleware(event);
	return resolve(event);

	// throws. commenting out for now
	return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};
