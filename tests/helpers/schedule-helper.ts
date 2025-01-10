import { CreateScheduleDto } from "@/schedule/application/dtos/create-schedule.dto";
import { ScheduleDto } from "@/schedule/application/dtos/schedule.dto";
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
	input?: Partial<CreateScheduleDto>,
): CreateScheduleDto {
	const dto = {
		begin: "12:00",
		end: "20:00",
		day: "SAT",
	};

	Object.assign(dto, input);
	return dto;
}
