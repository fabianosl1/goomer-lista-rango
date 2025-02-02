import { restaurantController } from "@/restaurant/infra/restaurant.controller";
import { scheduleRestaurantController } from "@/schedule/infra/schedule-restaurant.controller";
import { Hono } from "hono";

export const app = new Hono();

restaurantController.route(
	"/:restaurantId/schedules",
	scheduleRestaurantController,
);
app.route("/restaurants", restaurantController);
