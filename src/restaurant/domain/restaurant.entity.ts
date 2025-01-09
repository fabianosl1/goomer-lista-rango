import type { Address } from "@/restaurant/domain/address";
import type { Schedule } from "@/schedule/domain/schedule.entity";

export class Restaurant {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly picture: string,
		public readonly address: Address,
		public readonly schedules: Array<Schedule>,
	) {}
}
