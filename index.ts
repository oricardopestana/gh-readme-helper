import { H3, H3Event, serve } from "h3";
import dotenv from "dotenv";

import { handleUserStats } from "./handler/user-stats.ts";
import { handlerRendererTest } from "./handler/renderer-test.ts";

dotenv.config();

const app = new H3();
app.get("/health", (event: H3Event) => new Date().getTime());
app.get("/user-stats", (event: H3Event) => handleUserStats());
app.get("/renderer-test", (event: H3Event) => handlerRendererTest(event));

serve(app, { port: 3000 });
