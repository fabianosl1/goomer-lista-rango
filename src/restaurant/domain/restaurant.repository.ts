import type { Restaurant } from "@/restaurant/domain/restaurant.entity";

export interface RestaurantRepository {
	save(resturant: Restaurant): Promise<void>;
	list(): Promise<Restaurant[]>;
	get(id: string): Promise<Restaurant | null>;
	destroy(id: string): Promise<void>;
}
