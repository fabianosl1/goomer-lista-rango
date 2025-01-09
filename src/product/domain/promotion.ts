import type { Schedule } from "@/schedule/domain/schedule.entity";

export class Promotion {
	constructor(
		public readonly describe: string,
		public readonly price: number,
		public readonly schedules: Array<Schedule>,
	) {}
}
