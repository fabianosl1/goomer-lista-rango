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

	async create(name: string, address: Address): Promise<Restaurant> {
		const [restaurant] = await this.prisma.$queryRaw<StoredRestaurant[]>`
            insert into restaurants (name) 
            values (${name}) 
            returning *
        `;

		await this.prisma.$queryRaw`
            insert into restaurant_addresses (street, number, state, city, neighborhood, zipcode, restaurant_id)
            values (${address.street}, ${address.number}, ${address.state},${address.city}, ${address.neighborhood}, ${address.zipcode}, ${restaurant.id})
        `;

		return this.createRestaurant(restaurant, address);
	}

	async save(resturant: Restaurant): Promise<Restaurant> {
		await this.prisma.$executeRaw`
            update restaurants
            set name = ${resturant.name}, picture = ${resturant.picture}
            where id = ${Number.parseInt(resturant.id)}
        `;

		const { address } = resturant;

		await this.prisma.$executeRaw`
            update restaurant_addresses
             set street = ${address.street}, number = ${address.number}, state = ${address.state}, city = ${address.city}, neighborhood = ${address.neighborhood}, zipcode = ${address.zipcode}
             where restaurant_id = ${Number.parseInt(resturant.id)}
        `;

		return resturant;
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

	destroy(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	private createRestaurant(
		stored: StoredRestaurant,
		address: Address,
	): Restaurant {
		return new Restaurant(
			stored.id.toString(),
			stored.name,
			stored.picture,
			address,
		);
	}

	private parseResult(stored: RestaurantQueryResult): Restaurant {
		const { id, name, picture } = stored;
		const address = new Address(
			stored.street,
			stored.number,
			stored.state,
			stored.city,
			stored.neighborhood,
			stored.zipcode,
		);
		return this.createRestaurant({ id, name, picture }, address);
	}
}
