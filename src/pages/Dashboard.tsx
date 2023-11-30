import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Dashboard = () => {
	// get booked flights from local storage
	let flightData = JSON.parse(localStorage.getItem('flightData') || '[]');
	// convert flghtData to an array if it is not
	if (!Array.isArray(flightData)) {
		flightData = [flightData];
	}

	return (
		<div>
			<Navbar />
			{flightData.length > 0 ? (
				<div className="container mx-auto p-4">
					<h1 className="text-2xl font-bold mb-4">Your Booked Flights</h1>
					<div className="grid grid-cols-3 gap-4">
						{flightData.map((flight: any, index: number) => (
							<div
								key={index}
								className="bg-blue-100 p-4 rounded flex flex-col justify-between"
							>
								<div>
									<h2 className="text-xl font-bold">
										{flight.from} - {flight.to}
									</h2>
									<p className="text-gray-700">
										{flight.departDate} - {flight.returnDate}
									</p>
								</div>
								<div>
									<p className="text-gray-700">
										Price: ${flight.price} x {flight.seats} seats
									</p>
									<p className="text-gray-700">Total: ${flight.total}</p>
								</div>
								<div className="flex justify-end">
									<button
										onClick={() => {
											let flightData = JSON.parse(
												localStorage.getItem('flightData') || '[]'
											);
											flightData.splice(index, 1);
											localStorage.setItem(
												'flightData',
												JSON.stringify(flightData)
											);
											alert('Flight cancelled successfully');
											window.location.reload();
										}}
										className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600 transition duration-300"
									>
										Cancel
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="container mx-auto p-4">
					<h1 className="text-2xl font-bold mb-4">No Booked Flights</h1>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Dashboard;
