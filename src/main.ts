import { Hono } from "hono";
import { cors } from "hono/cors";

import { GIT_REPO_URL } from "./config.js";
import docs from "./routes/docs.js";
import render from "./routes/render.js";

const app = new Hono();
export default app;

app.use(cors());

app.get("/", (ctx) => ctx.redirect(GIT_REPO_URL));
app.route("/render", render);
app.route("/docs", docs);
