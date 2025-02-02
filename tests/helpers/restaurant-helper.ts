import { app } from "@/app";
import type { CreateRestaurantRequestDto } from "@/restaurant/application/dtos/create-restaurant.dto";
import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import { UpdateRestaurantRequestDto } from "@/restaurant/application/dtos/update-restaurant.dto";
import { Address } from "@/restaurant/domain/address";
import { Restaurant } from "@/restaurant/domain/restaurant.entity";

export function makeRestaurant(data: {
	id?: string;
	picture?: string | null;
	name?: string;
	address?: Address;
}) {
	const { id, picture, name, address } = data;
	return new Restaurant(
		id ?? "1",
		name ?? "rango brabo",
		picture ?? null,
		address ?? makeAddress({}),
	);
}

export function makeCreateRestaurantDto(
	input?: Partial<CreateRestaurantRequestDto>,
): CreateRestaurantRequestDto {
	const dto = {
		name: "rango brabo",
		schedules: [],
		address: {
			city: "Rio de Janeiro",
			street: "rua da luz",
			number: null,
			state: "RJ",
			neighborhood: "centro",
			zipcode: "000001",
		},
	};

	Object.assign(dto, input);

	return dto;
}

function makeAddress({
	city,
	street,
	number,
	state,
	neighborhood,
	zipcode,
}: {
	city?: string;
	street?: string;
	number?: string | null;
	state?: string;
	neighborhood?: string;
	zipcode?: string;
}): Address {
	return new Address(
		street ?? "rua da luz",
		number ?? null,
		state ?? "RJ",
		city ?? "Rio de janeiro",
		neighborhood ?? "centro",
		zipcode ?? "0001",
	);
}

export async function createRestaurant(
	body: CreateRestaurantRequestDto,
): Promise<RestaurantResponseDto> {
	const response = await app.request("/restaurants", {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-type": "application/json",
		},
	});

	if (response.status !== 201) {
		throw new Error("failed to create restaurant");
	}

	return await response.json();
}

export async function getRestaurant(
	resturantId: string,
): Promise<RestaurantResponseDto> {
	const schedule = await app.request(`/restaurants/${resturantId}`);

	if (schedule.status !== 200) {
		throw new Error("fail to create schedule");
	}

	return await schedule.json();
}
