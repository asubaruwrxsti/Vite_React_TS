import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { paramState } from '../store';

const Checkout = () => {
	// define the number of suggestions to display
	const numberOfFlights = 3;

	const [text] = useRecoilState(paramState);
	const navigate = useNavigate();
	const travelDetails = JSON.parse(text);

	useEffect(() => {
		if (text === '') {
			navigate('/');
		}
	}, [text, navigate]);

	function generateRandomTime() {
		const hours = Math.floor(Math.random() * 24);
		const minutes = Math.round((Math.floor(Math.random() * 60)) / 10) * 10;

		// add am or pm
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const hours12 = hours % 12 || 12;
		return `${hours12}:${minutes} ${ampm}`;
	}

	function generateRandomPrice() {
		return Math.floor(Math.random() * 900) + 100;
	}

	let flightData = Array.from({ length: numberOfFlights }, () => {
		let price = generateRandomPrice();
		let seats = travelDetails.travelers;
		return {
			price: price,
			seats: seats,
			total: price * seats
		};
	});

	return (
		<div className="checkout-container">
			<Navbar />

			<div className="checkout-content p-4">
				<h1 className="text-2xl font-bold mb-4">Your Travel Details</h1>

				<div className="bg-blue-100 p-4 mb-4 rounded">
					<h2 className="text-xl font-bold">Travel Summary</h2>

					<div className="flex flex-wrap gap-2">
						<div className="w-full md:w-1/6 mb-2">
							<h2 className="font-bold">From:</h2>
							<p>{travelDetails.from}</p>
						</div>
						<div className="w-full md:w-1/6 mb-2">
							<h2 className="font-bold">To:</h2>
							<p>{travelDetails.to}</p>
						</div>
						<div className="w-full md:w-1/6 mb-2">
							<h2 className="font-bold">Departure Date:</h2>
							<p>{travelDetails.departDate}</p>
						</div>
						<div className="w-full md:w-1/6 mb-2">
							<h2 className="font-bold">Return Date:</h2>
							<p>{travelDetails.returnDate}</p>
						</div>
						<div className="w-full md:w-1/6 mb-2">
							<h2 className="font-bold">Travelers:</h2>
							<p>{travelDetails.travelers}</p>
						</div>
					</div>
				</div>

				{Array.from(Array(numberOfFlights).keys()).map((_, index) => (
					<div key={index}>
						<div className="bg-gray-100 p-4 mb-4 rounded flex align-center justify-between col gap-4">
							<div className="flex flex-col items-center">
								<h2 className="text-xl font-bold mb-4">Flight Itinerary</h2>

								{/* Outbound Flight */}
								<div className="flex flex-wrap gap-4">
									<div className="flight-card p-4 rounded">
										<div className="flex items-center">
											<h2 className="font-bold">{travelDetails.from}</h2>
										</div>

										<p className="text-gray-500">{travelDetails.departDate}</p>
										<p className="text-gray-500">{generateRandomTime()}</p>
									</div>

									<div className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6 text-gray-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={4} d="M14 5l8 8m0 0l-8 8m8-8H3"
											/>
										</svg>
									</div>

									<div className="flight-card p-4 rounded">
										<div className="flex items-center">
											<h2 className="font-bold">{travelDetails.to}</h2>
										</div>

										<p className="text-gray-500">{travelDetails.returnDate}</p>
										<p className="text-gray-500">{generateRandomTime()}</p>
									</div>
								</div>

								{/* Return Flight */}
								<div className="flex flex-wrap gap-4">
									<div className="flight-card p-4 rounded">
										<div className="flex items-center">
											<h2 className="font-bold">{travelDetails.to}</h2>
										</div>

										<p className="text-gray-500">{travelDetails.returnDate}</p>
										<p className="text-gray-500">{generateRandomTime()}</p>
									</div>

									<div className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6 text-gray-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={4} d="M14 5l8 8m0 0l-8 8m8-8H3"
											/>
										</svg>
									</div>

									<div className="flight-card p-4 rounded">
										<div className="flex items-center">
											<h2 className="font-bold">{travelDetails.from}</h2>
										</div>
										<p className="text-gray-500">{travelDetails.returnDate}</p>
										<p className="text-gray-500">{generateRandomTime()}</p>
									</div>
								</div>

							</div>

							{/* Flight Details */}
							<div className="flex flex-col items-center">
								<h2 className="text-xl font-bold mb-4">Price</h2>
								<p id={"price" + index} className="text-3xl font-bold text-blue-500">${flightData[index].price}</p>
							</div>
							<div className="flex flex-col items-center">
								<h2 className="text-xl font-bold mb-4">Seats</h2>
								<p className="text-3xl font-bold text-blue-500">{travelDetails.travelers}</p>
							</div>
							<div className="flex flex-col items-center">
								<h2 className="text-xl font-bold mb-4">Total</h2>
								<p id={"setPrice" + index} className="text-3xl font-bold text-blue-500">${flightData[index].total}</p>
							</div>

							{/* Book now */}
							<div className="flex flex-col items-center">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline"
									onClick={() => {
										localStorage.setItem('flightData', JSON.stringify(flightData[index], travelDetails));
										alert('Flight booked successfully!');
										navigate('/dashboard');
									}}
								>
									Book Now
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<Footer />
		</div>
	);
};

export default Checkout;
