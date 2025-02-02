import { z } from "zod";

export const addressSchema = z
	.object({
		street: z.string().min(1),
		number: z.string().nullable(),
		state: z.string().min(1),
		city: z.string().min(1),
		neighborhood: z.string().min(1),
		zipcode: z.string().min(1),
	})
	.strict();

const scheduleSchema = z.object({
	begin: z.string(),
	end: z.string(),
	day: z.string(),
});

export const createScheduleSchema = scheduleSchema.strict();

export const updateScheduleSchema = scheduleSchema.partial();

export const createResturantSchema = z
	.object({
		name: z.string().min(1),
		address: addressSchema,
		schedules: z.array(createScheduleSchema),
	})
	.strict();

export const updateRestaurantSchema = z
	.object({
		name: z.string().min(1),
		address: addressSchema,
	})
	.partial();
