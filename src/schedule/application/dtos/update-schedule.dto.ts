import type { ScheduleResponseDto } from "@/schedule/application/dtos/schedule.dto";

export type UpdateScheduleDto = Partial<Omit<ScheduleResponseDto, "id">>;
