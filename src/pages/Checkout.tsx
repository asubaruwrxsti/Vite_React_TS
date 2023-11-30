import { useRecoilState } from 'recoil';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { paramState } from '../store';
import CarsList from '../components/CarsList';
import HotelsList from '../components/HotelsList';
import { useNavigate } from 'react-router-dom';

/**
 * The Checkout page
 * Displays the travel details and the checkout form
 */

const Checkout = () => {
	// Define the number of flights to display
	const numberOfFlights = 3;

	// Use navigate to redirect the user to the dashboard
	const history = useNavigate();

	// Use recoil state to get the travel details from the search bar component
	const [text] = useRecoilState(paramState);
	const travelDetails = text ? JSON.parse(text) : null;

	// Generate a random time (used for the flight details)
	function generateRandomTime() {
		const hours = Math.floor(Math.random() * 24);
		const minutes = Math.round((Math.floor(Math.random() * 60)) / 10) * 10;

		// add am or pm
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const hours12 = hours % 12 || 12;
		return `${hours12}:${minutes} ${ampm}`;
	}

	// Generate a random price (used for the flight details)
	function generateRandomPrice() {
		return Math.floor(Math.random() * 900) + 100;
	}

	// Generate the flight data object, this is used to hold and help later caluclate the flight details
	let flightData = Array.from({ length: numberOfFlights }, () => {
		let price = generateRandomPrice();
		let seats = travelDetails.travelers;
		return {
			from: travelDetails.from,
			to: travelDetails.to,
			departDate: travelDetails.departDate,
			returnDate: travelDetails.returnDate,
			price: price,
			seats: seats,
			total: price * seats,
			carAccomodation: {
				price: 0,
			},
			hotelAccomodation: {
				price: 0,
			},
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

				{/* Use array.from to generate the number of flights */}
				{Array.from(Array(numberOfFlights).keys()).map((_, index) => (
					<div key={index}>
						<div className="bg-gray-100 p-4 mb-4 rounded flex align-center justify-between col gap-4">
							<div className="flex flex-col items-center">
								<h2 className="text-xl font-bold mb-4">Flight Itinerary</h2>

								{/* This is the Outbound Flight, gets the origin and destination from the travel details */}
								{/* Departure Data */}
								<div className="flex flex-wrap gap-4">
									<div className="flight-card p-4 rounded">
										<div className="flex items-center">
											<h2 className="font-bold">{travelDetails.from}</h2>
										</div>

										<p className="text-gray-500">{travelDetails.departDate}</p>
										<p className="text-gray-500">{generateRandomTime()}</p>
									</div>

									{/* This is the svg arrow in the middle of the destinations */}
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

									{/* Return Data */}
									<div className="flight-card p-4 rounded">
										<div className="flex items-center">
											<h2 className="font-bold">{travelDetails.to}</h2>
										</div>

										<p className="text-gray-500">{travelDetails.returnDate}</p>
										<p className="text-gray-500">{generateRandomTime()}</p>
									</div>
								</div>

								{/* This is the Return Flight, uses the same origin logic as the Outbound Flight */}
								{/* Return Data */}
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
							{/* Price */}
							<div className="flex flex-col items-center">
								<h2 className="text-xl font-bold mb-4">Price</h2>
								<p id={"price" + index} className="text-3xl font-bold text-blue-500">${flightData[index].price}</p>
							</div>
							{/* Number of travelers */}
							<div className="flex flex-col items-center">
								<h2 className="text-xl font-bold mb-4">Seats</h2>
								<p className="text-3xl font-bold text-blue-500">{travelDetails.travelers}</p>
							</div>
							{/* Total value */}
							<div className="flex flex-col items-center">
								<h2 className="text-xl font-bold mb-4">Total</h2>
								<p id={"setPrice" + index} className="text-3xl font-bold text-blue-500">${flightData[index].total}</p>
							</div>
							<CarsList index={index} />
							<HotelsList index={index} />

							{/* Book now button*/}
							<div className="flex flex-col items-center">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline"
									onClick={() => {
										// On click, handle the logic if the user has selected a car or hotel
										
										// We need to get the flight data from localStorage
										// Append the flight data to the flightData array if the user has already booked flights
										let allFlightData = JSON.parse(localStorage.getItem('flightData') || '[]');
										if (!Array.isArray(allFlightData)) {
											allFlightData = [allFlightData];
										}

										// Get the car accomodation value, if the user has not selected a car, set the price to 0
										let carElement = document.getElementById("car" + index) as HTMLInputElement;
										if (carElement?.value === "Select a car") {
											flightData[index].carAccomodation.price = 0;
										} else {
											flightData[index].carAccomodation.price = parseInt(carElement?.value);
										}

										// Get the hotel accomodation value, if the user has not selected a hotel, set the price to 0
										let hotelElement = document.getElementById("hotel" + index) as HTMLInputElement;
										if (hotelElement?.value === "Select a hotel") {
											flightData[index].hotelAccomodation.price = 0;
										} else {
											flightData[index].hotelAccomodation.price = parseInt(hotelElement?.value);
										}

										// Update the total price
										flightData[index].total = flightData[index].total + flightData[index].carAccomodation.price + flightData[index].hotelAccomodation.price
										
										// Push the flight data to the allFlightData array and save it to localStorage
										allFlightData.push(flightData[index]);
										localStorage.setItem('flightData', JSON.stringify(allFlightData));

										// Alert the user and redirect to the dashboard
										alert('Flight booked successfully!');
										history('/dashboard');
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
