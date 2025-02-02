import type { Schedule } from "@/schedule/domain/schedule.entity";
import type { ScheduleRepository } from "@/schedule/domain/schedule.repository";

export interface ScheduleRestaurantRepository extends ScheduleRepository {
	create(
		restaurantId: string | null,
		schedule: Schedule | Schedule[],
	): Promise<void>;
	listByRestaurantId(restaurantId: string): Promise<Schedule[]>;
}
