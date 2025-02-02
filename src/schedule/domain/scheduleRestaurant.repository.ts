import type { Schedule } from "@/schedule/domain/schedule.entity";
import type { ScheduleRepository } from "@/schedule/domain/schedule.repository";

export interface ScheduleRestaurantRepository extends ScheduleRepository {
	create(
		restaurantId: string,
		begin: string,
		end: string,
		day: string,
	): Promise<Schedule>;
	createBach(
		restaurantId: string | null,
		schedules: Omit<Schedule, "id">[],
	): Promise<Schedule[]>;
	listByRestaurantId(restaurantId: string): Promise<Schedule[]>;
}
