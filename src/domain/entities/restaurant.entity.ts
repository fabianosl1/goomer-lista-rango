import type { Address } from "@/domain/entities/address.entity";
import type { Product } from "@/domain/entities/product.entity";
import type { Schedule } from "@/domain/entities/schedule.entity";

export class Restaurant {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly picture: string,
		public readonly address: Address,
		public readonly schedules: Array<Schedule>,
		public readonly products: Array<Product>,
	) {}
}
