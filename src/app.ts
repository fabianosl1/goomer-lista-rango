import { restaurantController } from "@/restaurant/infra/restaurant.controller";
import { Hono } from "hono";

export const app = new Hono();

app.route("/restaurants", restaurantController);
