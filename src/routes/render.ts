import { Hono, type MiddlewareHandler } from "hono";
import { bodyLimit } from "hono/body-limit";
import objectHash from "object-hash";

import { type Env } from "../env.js";
import { tex2svg } from "../math/mathjax.js";

const app = new Hono<Env>();
export default app;

interface StoreOutputOptions {
	/** File extension (without a leading dot) to add after the cache key. */
	extension: string;
}

/**
 * Creates a middleware handler that first checks if an object already exists
 * for the POST body.
 * @param options options to pass to the created middleware handler
 * @returns middleware handler
 */
function storeOutput(options: StoreOutputOptions): MiddlewareHandler<Env> {
	return async (ctx, next) => {
		const req = ctx.req.raw.clone();
		const tex = await req.text();
		const key = `${objectHash(tex)}.${options.extension}`;

		const object = await ctx.env.R2_BUCKET.head(key);
		const url = new URL(`/${key}`, ctx.env.R2_PUBLIC_URL);
		if (object != null) return ctx.redirect(url, 302);

		await next();

		const res = ctx.res.clone();
		const output = await res.arrayBuffer();
		const contentType = ctx.res.headers.get("Content-Type")!;

		await ctx.env.R2_BUCKET.put(key, output, {
			httpMetadata: {
				contentType
			}
		});

		ctx.res = new Response(null, { status: 302, headers: { Location: url.toString() } });
		return;
	};
}

app.post("/svg", bodyLimit({ maxSize: 1024 }), storeOutput({ extension: "svg" }), async (ctx) => {
	const tex = await ctx.req.raw.text();
	const svg = await tex2svg(tex);
	return ctx.body(svg, 200, { "Content-Type": "image/svg+xml" });
});
