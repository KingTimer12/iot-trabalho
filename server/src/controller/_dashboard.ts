const dashboard = () => {
	const profitMonthData = [
		{ month: "Janeiro", profit: 186 },
		{ month: "Fevereiro", profit: 305 },
		{ month: "Março", profit: 237 },
		{ month: "Abril", profit: 73 },
		{ month: "Maio", profit: 209 },
		{ month: "Junho", profit: 214 },
		{ month: "Julho", profit: 180 },
		{ month: "Agosto", profit: 220 },
		{ month: "Setembro", profit: 250 },
		{ month: "Outubro", profit: 300 },
		{ month: "Novembro", profit: 280 },
		{ month: "Dezembro", profit: 320 },
	];
	const unitsSoldMonthData = [
		{ month: "Janeiro", units: 150 },
		{ month: "Fevereiro", units: 200 },
		{ month: "Março", units: 180 },
		{ month: "Abril", units: 40 },
		{ month: "Maio", units: 200 },
		{ month: "Junho", units: 230 },
		{ month: "Julho", units: 270 },
		{ month: "Agosto", units: 220 },
		{ month: "Setembro", units: 250 },
		{ month: "Outubro", units: 120 },
		{ month: "Novembro", units: 240 },
		{ month: "Dezembro", units: 300 },
	];

	const typesData = [
		{ name: "Chocolate", value: 186 },
		{ name: "Morango", value: 305 },
		{ name: "Limão", value: 237 },
	];
	const cards = [
		{
			title: "Total de Vendas",
			value: unitsSoldMonthData.reduce((acc, curr) => acc + curr.units, 0),
			suffix: "unidades",
		},
		{
			title: "Receita Atual",
			value: profitMonthData.reduce((acc, curr) => acc + curr.profit, 0),
			prefix: "R$",
		},
		{
			title: "Sabor Mais Vendido",
			value: typesData.sort((a, b) => b.value - a.value)[0].name,
		},
	];

	const data = {
		charts: {
			profitMonthData,
			unitsSoldMonthData,
			typesData,
		},
		cards,
		target: "app-desktop",
	};

	return data;
};

export { dashboard };
