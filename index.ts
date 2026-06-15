import { H3, H3Event, serve } from "h3";
import dotenv from "dotenv";

import { handleUserStats } from "./handler/user-stats.ts";

dotenv.config();

const app = new H3();
app.get("/health", (event: H3Event) => new Date().getTime());
app.get("/user-stats", (event: H3Event) => handleUserStats());

serve(app, { port: 3000 });
