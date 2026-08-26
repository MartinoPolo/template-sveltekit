import type { RequestHandler } from './$types';
import { createAuth } from '$lib/server/auth.js';

const handler: RequestHandler = (event) => createAuth(event).handler(event.request);

export const GET = handler;
export const POST = handler;
