import {
	createResturantSchema,
	updateRestaurantSchema,
} from "@/restaurant/infra/restaurant.schemas";
import {
	createRestaurant,
	deleteRestaurant,
	getRestaurant,
	listRestaurant,
	updateRestaurant,
} from "@/shared/di";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

export const restaurantController = new Hono();

restaurantController.get("/", async (ctx) => {
	const restaurants = await listRestaurant.execute();
	return ctx.json(restaurants);
});

restaurantController.post(
	"/",
	zValidator("json", createResturantSchema),
	async (ctx) => {
		const body = ctx.req.valid("json");
		const restaurant = await createRestaurant.execute(body);
		return ctx.json(restaurant);
	},
);

restaurantController.patch(
	"/:id",
	zValidator("json", updateRestaurantSchema),
	async (ctx) => {
		const body = ctx.req.valid("json");
		const restaurantId = ctx.req.param("id");
		const restaurant = updateRestaurant.execute(restaurantId, body);
		return ctx.json(restaurant);
	},
);

restaurantController.get("/:id", async (ctx) => {
	const restaurantId = ctx.req.param("id");
	const restaurant = await getRestaurant.execute(restaurantId);
	return ctx.json(restaurant);
});

restaurantController.delete("/:id", async (ctx) => {
	const restaurantId = ctx.req.param("id");
	await deleteRestaurant.execute(restaurantId);
	return ctx.status(204);
});
