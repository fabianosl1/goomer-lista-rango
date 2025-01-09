export class Address {
	constructor(
		public readonly street: string,
		public readonly number: string,
		public readonly state: string,
		public readonly city: string,
		public readonly neighborhood: string,
		public readonly zipcode: string,
	) {}
}
