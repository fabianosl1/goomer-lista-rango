import type { Address } from "@/restaurant/domain/address";

export class Restaurant {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly picture: string,
		public readonly address: Address,
	) {}
}
