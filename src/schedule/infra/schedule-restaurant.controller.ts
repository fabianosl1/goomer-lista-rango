import { createScheduleSchema, updateScheduleSchema } from "@/shared/schemas";
import {
	createScheduleRestaurant,
	deleteScheduleRestaurant,
	updateScheduleRestaurant,
} from "@/shared/di";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

export const scheduleRestaurantController = new Hono();

scheduleRestaurantController.post(
	"/",
	zValidator("json", createScheduleSchema),
	async (ctx) => {
		const restaurantId = ctx.req.param("restaurantId") as string;
		const body = ctx.req.valid("json");

		const restaurant = await createScheduleRestaurant.execute(
			restaurantId,
			body,
		);
		return ctx.json(restaurant);
	},
);

scheduleRestaurantController.patch(
	"/:id",
	zValidator("json", updateScheduleSchema),
	async (ctx) => {
		const body = ctx.req.valid("json");
		const scheduleId = ctx.req.param("id");

		const restaurant = await updateScheduleRestaurant.execute(scheduleId, body);
		return ctx.json(restaurant);
	},
);

scheduleRestaurantController.delete("/:id", async (ctx) => {
	const scheduleId = ctx.req.param("id");

	await deleteScheduleRestaurant.execute(scheduleId);
	return ctx.status(204);
});
