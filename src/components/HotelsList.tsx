const HotelsList = () => {
	const Hotels = [
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
  
	return (
	  <div>
		<h2>Pick a hotel option</h2>
		<ul>
			{Hotels.map((hotel, index) => (
				<li key={index}>
					<h3>{hotel.hotelName}</h3>
					<p>{hotel.hotelAddress}</p>
					<p>{hotel.hotelPrice}</p>
				</li>
			))}
		</ul>
	  </div>
	);
  };
  
  export default HotelsList;
  