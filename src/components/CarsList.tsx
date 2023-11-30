import { useState } from 'react';

interface Car {
	carName: string;
	carModel: string;
	carPrice: string;
}

type CarsListProps = {
	index : number;
};

const CarsList = ({index}: CarsListProps) => {
	const Cars: Car[] = [
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

	const [selectedCar, setSelectedCar] = useState<number | null>(0);

	const handleCarSelect = (index: number) => {
		setSelectedCar(index);
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Rental Option</h2>
			<select
				className="border rounded p-2"
				value={selectedCar !== null ? selectedCar : undefined}
				onChange={(e) => handleCarSelect(Number(e.target.value))}
				id = {"car" + index}
			>
				<option>Select a car</option>
				{Cars.map((car, index) => (
					<option key={index} value={car.carPrice}>
						{car.carName} - {car.carModel} (${car.carPrice})
					</option>
				))}
			</select>
		</div>
	);
};

export default CarsList;
