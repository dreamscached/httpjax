import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";

import spec from "$src/../openapi.json" with { type: "json" };
import type { Env } from "$src/env.js";

const app = new Hono<Env>();
export default app;

// @ts-expect-error weird typing quirks of json import
app.get("/swagger/*", swaggerUI({ spec }));
app.get("/openapi.json", (ctx) => ctx.json(spec));
