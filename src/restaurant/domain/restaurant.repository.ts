import type { Address } from "@/restaurant/domain/address";
import type { Restaurant } from "@/restaurant/domain/restaurant.entity";

export interface RestaurantRepository {
	create(name: string, address: Address): Promise<Restaurant>;
	save(resturant: Restaurant): Promise<Restaurant>;
	list(): Promise<Restaurant[]>;
	get(id: string): Promise<Restaurant | null>;
	destroy(id: string): Promise<void>;
}
