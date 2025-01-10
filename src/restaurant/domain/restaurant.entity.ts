import type { Address } from "@/restaurant/domain/address";

export class Restaurant {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly picture: string | null,
		public readonly address: Address,
	) {
		if (name === "") {
			throw new Error("o nome não pode estar vazio");
		}
	}
}
