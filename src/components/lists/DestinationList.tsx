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
		<div className="flex flex-col items-center justify-center w-full p-4 md:p-6 lg:p-8">
			<h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 text-center">
				Popular Destinations
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl">
				{destinations.map((destination, index) => (
					<div key={index} className="relative overflow-hidden bg-white rounded-xl shadow-lg group hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
						<img
							src={destination.imageUrl}
							alt={`Image of ${destination.name}`}
							className="w-full h-60 object-cover transition duration-500 transform group-hover:scale-105 group-hover:blur-sm ease-in-out md:group-hover:blur-sm sm:h-52 md:h-60"
						/>
						<div className="absolute inset-0 flex items-center justify-center flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-50 md:opacity-0 md:group-hover:opacity-100">
							<p className="text-white font-semibold text-lg mb-2 md:text-lg">{destination.name}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DestinationList;
