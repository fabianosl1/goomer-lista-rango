import type { Promotion } from "@/product/domain/promotion";

export class Product {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly category: string,
		public readonly picture: string,
		public readonly price: number,
		public readonly promotion: Promotion,
	) {}
}
