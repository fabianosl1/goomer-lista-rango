import { ScheduleResponseDto } from "@/schedule/application/dtos/schedule.dto";
import type { UpdateScheduleDto } from "@/schedule/application/dtos/update-schedule.dto";
import { Schedule } from "@/schedule/domain/schedule.entity";
import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";

export class UpdateScheduleRestaurantUseCase {
	constructor(
		private readonly scheduleRestaurantRepository: ScheduleRestaurantRepository,
	) {}

	async execute(
		scheduleId: string,
		dto: UpdateScheduleDto,
	): Promise<ScheduleResponseDto> {
		const stored = await this.scheduleRestaurantRepository.get(scheduleId);

		const schedule = new Schedule(
			stored.id,
			dto.begin ?? stored.begin,
			dto.end ?? stored.end,
			dto.day ?? stored.day,
		);

		await this.scheduleRestaurantRepository.save(schedule);

		return new ScheduleResponseDto(schedule);
	}
}
