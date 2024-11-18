/**
 * DestinationList component
 * Displays the list of destinations
 */
const DestinationList = () => {
	// Dummy data, normally this would be fetched from a backend
	// The images are saved in the public folder
	const destinations = [
		{ name: 'Paris', imageUrl: '/paris.jpg' },
		{ name: 'Tokyo', imageUrl: '/tokyo.jpg' },
		{ name: 'New York', imageUrl: '/newyork.jpg' },
		{ name: 'London', imageUrl: '/london.jpg' },
	];

	return (
		<div className="max-w-screen-md mx-auto mt-8 p-4">
			<h2 className="text-2xl font-semibold mb-4">Popular Destinations</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{destinations.map((destination, index) => (
					<div key={index} className="relative overflow-hidden bg-white rounded shadow-lg group">
						<img
							src={destination.imageUrl}
							alt={`Image of ${destination.name}`}
							className="w-full h-60 object-cover transition duration-500 transform group-hover:scale-105 group-hover:blur-sm ease-in-out"
						/>
						<div className="absolute inset-0 flex items-center justify-center flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-50">
							<p className="text-white font-semibold text-lg mb-2">{destination.name}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DestinationList;
