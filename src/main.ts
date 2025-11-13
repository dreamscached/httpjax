import { Hono } from "hono";

import render from "./routes/render.js";

const app = new Hono();
export default app;

app.route("/render", render);
