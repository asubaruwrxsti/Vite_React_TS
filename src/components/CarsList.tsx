const CarsList = () => {
	const Cars = [
		{
			"carName": "Toyota",
			"carModel": "Corolla",
			"carPrice": "20"
		},
		{
			"carName": "Honda",
			"carModel": "Civic",
			"carPrice": "25"
		},
		{
			"carName": "Ford",
			"carModel": "Focus",
			"carPrice": "30"
		}
	];

	return (
		<div>
			<h2>Pick a car option</h2>
			<ul>
				{Cars.map((car, index) => (
					<li key={index}>
						<h3>{car.carName}</h3>
						<p>{car.carModel}</p>
						<p>{car.carPrice}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CarsList;
