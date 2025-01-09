import type { Promotion } from "@/domain/entities/promotion.entity";

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
