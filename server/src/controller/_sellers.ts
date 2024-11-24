interface Seller {
	name: string;
	ativo: boolean;
	unitsSold: number;
	profit: number;
	toFinish: number;
}
const map = new Map<number, Seller>();

const sellers = () => {
	map.set(1, {
		name: "Jessica",
		ativo: false,
		unitsSold: 0,
		profit: 0,
		toFinish: 0,
	});
	map.set(2, {
		name: "Lucas",
		ativo: false,
		unitsSold: 0,
		profit: 0,
		toFinish: 0,
	});
	map.set(3, {
		name: "Carlos",
		ativo: false,
		unitsSold: 0,
		profit: 0,
		toFinish: 0,
	});

	const fetchAll = () => {
		const data = map.entries().map(([key, value]) => ({ id: key, ...value })).toArray();
		return data;
	};

	const update = (id: number, seller: Seller) => {
		map.set(id, seller);
		console.log('id', seller)
		return { id, ...seller };
	};

	const fetchById = (id: number) => {
		return map.get(id);
	};

	return { fetchAll, update, fetchById };
};

export { sellers, type Seller };
