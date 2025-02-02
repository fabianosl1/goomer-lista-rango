import type { Restaurant } from "@/restaurant/domain/restaurant.entity";

export class RestaurantItem {
	public readonly id: string;

	public readonly name: string;

	public readonly picture: string | null;

	public readonly address: string;

	constructor(restaurant: Restaurant) {
		if (restaurant.id === null) {
			throw new Error("restaurant without id");
		}

		this.id = restaurant.id;
		this.name = restaurant.name;
		this.picture = restaurant.picture;
		this.address = restaurant.address.toString();
	}
}

export type ListRestaurantResponseDto = Array<RestaurantItem>;
