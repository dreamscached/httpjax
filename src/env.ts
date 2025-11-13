import type { Env as HonoEnv } from "hono";

export type Env = HonoEnv & {
	Bindings: {
		R2_BUCKET: R2Bucket;
		R2_PUBLIC_URL: string;
	};
	Variables: {};
};
