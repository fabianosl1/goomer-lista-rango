import { app } from "@/app";
import type { CreateScheduleRequestDto } from "@/schedule/application/dtos/create-schedule.dto";
import type { ScheduleResponseDto } from "@/schedule/application/dtos/schedule.dto";
import { Schedule } from "@/schedule/domain/schedule.entity";

export function makeSchedule({
	id,
	begin,
	end,
	day,
}: { id?: string; begin: string; end: string; day: string }) {
	return new Schedule(id ?? "1", begin, end, day);
}

export function makeCreateScheduleDto(
	input?: Partial<CreateScheduleRequestDto>,
): CreateScheduleRequestDto {
	const dto = {
		begin: "12:00",
		end: "20:00",
		day: "SAT",
	};

	Object.assign(dto, input);
	return dto;
}

export async function createSchedule(
	resturantId: string,
	body: CreateScheduleRequestDto,
): Promise<ScheduleResponseDto> {
	const schedule = await app.request(`/restaurants/${resturantId}/schedules`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (schedule.status !== 201) {
		throw new Error("fail to create schedule");
	}

	return await schedule.json();
}
