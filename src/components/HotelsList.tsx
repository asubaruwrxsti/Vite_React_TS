import { useState } from 'react';

interface Hotel {
	hotelName: string;
	hotelAddress: string;
	hotelPrice: string;
}

type HotelsListProps = {
	index : number;
};

/**
 * The HotelsList component
 * Displays the list of hotels
 */

const HotelsList = ({index}: HotelsListProps) => {
	// Dummy data, normally this would be fetched from a backend
	const Hotels: Hotel[] = [
		{
			"hotelName": "Hotel 1",
			"hotelAddress": "Address 1",
			"hotelPrice": "100",
		},
		{
			"hotelName": "Hotel 2",
			"hotelAddress": "Address 2",
			"hotelPrice": "200",
		},
		{
			"hotelName": "Hotel 3",
			"hotelAddress": "Address 3",
			"hotelPrice": "300",
		},
	];

	// Use state to store the selected hotel
	const [selectedHotel, setSelectedHotel] = useState<number | null>(0);
	const handleHotelSelect = (index: number) => {
		setSelectedHotel(index);
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Pick a hotel option</h2>
			{/* Display a select list of hotels */}
			<select
				className="border rounded p-2"
				value={selectedHotel !== null ? selectedHotel : undefined}
				onChange={(e) => handleHotelSelect(Number(e.target.value))}
				id = {"hotel" + index}
			>
				{/* Display the information for each hotel using the map function */}
				<option>Select a hotel</option>
				{Hotels.map((hotel, index) => (
					<option key={index} value={hotel.hotelPrice}>
						{hotel.hotelName} - {hotel.hotelAddress} (${hotel.hotelPrice})
					</option>
				))}
			</select>
		</div>
	);
};

export default HotelsList;
