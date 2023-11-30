import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Dashboard = () => {
	// get booked flights from local storage
	const flightData = localStorage.getItem('flightData');
	
	return (
		<div>
			<Navbar />
			{flightData ? (
				<div className="flex flex-col items-center justify-center">
					<div className="bg-green-500 text-white px-4 py-4 rounded mb-4 mt-2">
						<div>Flight booked successfully!</div>
					</div>
					<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
						<div className="col-span-6 sm:col-span-3">
							<label htmlFor="flightData" className="block text-sm font-medium text-gray-700">
								Flight Data
							</label>
							<textarea
								name="flightData"
								id="flightData"
								value={flightData}
								className="mt-3 block w-full shadow-sm sm:text-sm border-gray-300"
								rows={10}
								readOnly
							/>
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center">
					<div className="bg-red-500 text-white px-4 py-4 rounded mb-4 mt-2">
						<div>No flight booked yet!</div>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Dashboard;
