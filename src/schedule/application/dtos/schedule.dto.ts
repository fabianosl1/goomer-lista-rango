import type { Schedule } from "@/schedule/domain/schedule.entity";

export class ScheduleDto {
	public readonly id: string;
	public readonly begin: string;
	public readonly end: string;
	public readonly day: string;

	constructor(schedule: Schedule) {
		if (schedule.id === null) {
			throw new Error("schedule without id");
		}

		this.id = schedule.id;
		this.begin = schedule.begin;
		this.end = schedule.end;
		this.day = schedule.day;
	}
}
