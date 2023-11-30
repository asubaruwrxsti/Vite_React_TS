const DestinationList = () => {
	const destinations = [
		{ name: 'Paris', imageUrl: 'https://via.placeholder.com/300' },
		{ name: 'Tokyo', imageUrl: 'https://via.placeholder.com/300' },
		{ name: 'New York', imageUrl: 'https://via.placeholder.com/300' },
		{ name: 'London', imageUrl: 'https://via.placeholder.com/300' },
		// Add more destinations with imageUrl
	];

	return (
		<div className="max-w-screen-md mx-auto mt-8 p-4">
			<h2 className="text-2xl font-semibold mb-4">Popular Destinations</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{destinations.map((destination, index) => (
					<div key={index} className="relative overflow-hidden bg-white rounded shadow-lg">
						<img
							src={destination.imageUrl}
							alt={`Image of ${destination.name}`}
							className="w-full h-60 object-cover transition-transform transform hover:scale-105"
						/>
						<div className="absolute inset-0 flex items-center justify-center flex-col opacity-0 hover:opacity-100 transition-opacity duration-300">
							<p className="text-white font-semibold text-lg mb-2">{destination.name}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DestinationList;
