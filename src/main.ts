import { Hono } from "hono";
import { cors } from "hono/cors";

import docs from "./routes/docs.js";
import render from "./routes/render.js";

const app = new Hono();
export default app;

app.use(cors());

app.route("/render", render);
app.route("/docs", docs);
