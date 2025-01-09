import type { Address } from "@/domain/entities/address";
import type { Schedule } from "@/domain/entities/schedule.entity";

export class Restaurant {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly picture: string,
		public readonly address: Address,
		public readonly schedules: Array<Schedule>,
	) {}
}
