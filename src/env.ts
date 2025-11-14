import type { Env as HonoEnv } from "hono";

export type Env = HonoEnv & {
	Bindings: {
		/** Cloudflare R2 object store. */
		R2_BUCKET: R2Bucket;
		/** Public base URL for the object store to return in Location header. */
		R2_PUBLIC_URL: string;
	};
};
