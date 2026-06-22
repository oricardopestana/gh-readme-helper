import { H3Event, HTTPError } from "h3";
import type { GithubUser, GithubUserRepo } from "../models/github.model.ts";
import { GithubService } from "../services/github.service.ts";
import type { HttpResponse } from "../models/http.model.ts";
import { useAsync } from "@oricardopestana/ts-utils";
import Card from "../renderer/card.renderer.ts";

export async function handlerRendererTest(event: H3Event) {
  event.res.headers.set("Content-Type", "image/svg+xml");

  const card = new Card(
    600,
    220,
    "Test Card",
    10,
    {
      background: "#fffefe",
      title: "#2f80ed",
      border: "#e4e2e2",
      text: "#434d58",
      icon: "#4c71f2",
    },
    "",
  );
  return card.render(`
    <polygon points="50,10 0,190 100,190" fill="lime" />
    <rect width="150" height="100" x="120" y="50" fill="blue" />
    <circle r="45" cx="350" cy="100" fill="red" />
    <text x="420" y="100" fill="red">I love asdasds!</text>
  `);
}
