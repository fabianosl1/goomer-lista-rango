import type { Address } from "@/restaurant/domain/address";

export class Restaurant {
	constructor(
		public id: string | null,
		public name: string,
		public picture: string | null,
		public address: Address,
	) {
		if (name === "") {
			throw new Error("o nome não pode estar vazio");
		}
	}
}
