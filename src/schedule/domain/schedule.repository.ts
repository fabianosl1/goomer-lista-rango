import type { Schedule } from "@/schedule/domain/schedule.entity";

export interface ScheduleRepository {
	save(schedule: Schedule): Promise<void>;
	destroy(scheduleId: string): Promise<void>;
}
