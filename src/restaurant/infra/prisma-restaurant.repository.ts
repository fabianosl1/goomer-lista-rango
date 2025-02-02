import { Address } from "@/restaurant/domain/address";
import { Restaurant } from "@/restaurant/domain/restaurant.entity";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";
import {
	PrismaClient,
	type Address as StoredAddress,
	type Restaurant as StoredRestaurant,
} from "@prisma/client";

type RestaurantQueryResult = StoredRestaurant & Omit<StoredAddress, "id">;

export class PrismaRestaurantRepository implements RestaurantRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async save(restaurant: Restaurant): Promise<void> {
		if (restaurant.id === null) {
			await this.create(restaurant);
		} else {
			await this.prisma.$executeRaw`
				update restaurants
				set name = ${restaurant.name}, picture = ${restaurant.picture}
				where id = ${Number.parseInt(restaurant.id)}
			`;

			const { address } = restaurant;

			await this.prisma.$executeRaw`
				update restaurant_addresses
				set street = ${address.street}, number = ${address.number}, state = ${address.state}, city = ${address.city}, neighborhood = ${address.neighborhood}, zipcode = ${address.zipcode}
				where restaurant_id = ${Number.parseInt(restaurant.id)}
			`;
		}
	}

	private async create(restaurant: Restaurant): Promise<void> {
		const address = restaurant.address;

		const [stored] = await this.prisma.$queryRaw<StoredRestaurant[]>`
            insert into restaurants (name) 
            values (${restaurant.name}) 
            returning *
        `;

		await this.prisma.$queryRaw`
            insert into restaurant_addresses (street, number, state, city, neighborhood, zipcode, restaurant_id)
            values (${address.street}, ${address.number}, ${address.state},${address.city}, ${address.neighborhood}, ${address.zipcode}, ${stored.id})
        `;

		restaurant.id = stored.id.toString();
	}

	async list(): Promise<Restaurant[]> {
		const stored = await this.prisma.$queryRaw<RestaurantQueryResult[]>`
        select
            restaurants.*,
            restaurant_addresses.street,
            restaurant_addresses.number,
            restaurant_addresses.neighborhood,
            restaurant_addresses.city,
            restaurant_addresses.state,
            restaurant_addresses.zipcode
        from restaurants
        left join restaurant_addresses on restaurants.id = restaurant_addresses.restaurant_id
        `;

		const restaurants = [];

		for (const data of stored) {
			restaurants.push(this.parseResult(data));
		}

		return restaurants;
	}

	async get(id: string): Promise<Restaurant | null> {
		const [stored] = await this.prisma.$queryRaw<RestaurantQueryResult[]>`
        select
        	r.*,
            ra.street,
            ra.number,
            ra.neighborhood,
            ra.city,
            ra.state,
            ra.zipcode
        from restaurants r
        left join restaurant_addresses ra on r.id = ra.restaurant_id
        where r.id = ${Number.parseInt(id)}
        `;

		if (!stored) {
			return null;
		}

		return this.parseResult(stored);
	}

	async destroy(restaurantId: string): Promise<void> {
		await this.prisma.$executeRaw`
		delete from restaurant
		where id = ${restaurantId}
		`;
	}

	private parseResult(stored: RestaurantQueryResult): Restaurant {
		const address = new Address(
			stored.street,
			stored.number,
			stored.state,
			stored.city,
			stored.neighborhood,
			stored.zipcode,
		);

		return new Restaurant(
			stored.id.toString(),
			stored.name,
			stored.picture,
			address,
		);
	}
}
