import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";

export class deleteScheduleRestaurantUseCase {
	constructor(
		private readonly scheduleRestaurantRepository: ScheduleRestaurantRepository,
	) {}

	async execute(scheduleId: string) {
		await this.scheduleRestaurantRepository.destroy(scheduleId);
	}
}
