import type { Address } from "@/restaurant/domain/address";
import type { Restaurant } from "@/restaurant/domain/restaurant.entity";

export interface RestaurantRepository {
	save(resturant: Restaurant): Promise<Restaurant>;
	create(name: string, address: Address): Promise<Restaurant>;
	list(): Promise<Restaurant[]>;
	get(id: string): Promise<Restaurant | null>;
	destroy(id: string): Promise<void>;
}
