import type { Schedule } from "@/schedule/domain/schedule.entity";
import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";
import { PrismaClient } from "@prisma/client";

export class PrismaScheduleRestaurantRepository
	implements ScheduleRestaurantRepository
{
	private readonly prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	create(
		restaurantId: string,
		begin: string,
		end: string,
		day: string,
	): Promise<Schedule> {
		throw new Error("Method not implemented.");
	}

	createBach(
		restaurantId: string,
		schedules: Omit<Schedule, "id">[],
	): Promise<Schedule[]> {
		throw new Error("Method not implemented.");
	}

	listByRestaurantId(restaurantId: string): Promise<Schedule[]> {
		throw new Error("Method not implemented.");
	}

	save(schedule: Schedule): Promise<Schedule> {
		throw new Error("Method not implemented.");
	}

	destroy(scheduleId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
