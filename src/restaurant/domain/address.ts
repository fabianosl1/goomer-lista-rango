export class Address {
	constructor(
		public readonly street: string,
		public readonly number: string | null,
		public readonly state: string,
		public readonly city: string,
		public readonly neighborhood: string,
		public readonly zipcode: string,
	) {}

	static builder() {
		return new AddressBuilder();
	}

	toString() {
		return `${this.street}, ${this.number ?? "SN"} - ${this.neighborhood}, ${this.city} - ${this.state}, ${this.zipcode}`;
	}
}

class AddressBuilder {
	private street!: string;
	private number!: string | null;
	private state!: string;
	private city!: string;
	private neighborhood!: string;
	private zipcode!: string;

	withStreet(street: string) {
		this.street = street;
		return this;
	}

	withNumber(number: string | null) {
		this.number = number;
		return this;
	}

	withState(state: string) {
		this.state = state;
		return this;
	}

	withCity(city: string) {
		this.city = city;
		return this;
	}

	withNeighborhood(neighborhood: string) {
		this.neighborhood = neighborhood;
		return this;
	}

	withZipcode(zipcode: string) {
		this.zipcode = zipcode;
		return this;
	}

	build() {
		return new Address(
			this.street,
			this.number,
			this.state,
			this.city,
			this.neighborhood,
			this.zipcode,
		);
	}
}
