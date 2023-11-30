import React, { useState } from 'react';
import { paramState } from '../store';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

	const [, setText] = useRecoilState(paramState);
	const history = useNavigate();

	const handleSubmit = (e: { preventDefault: () => void; }) => {
	  e.preventDefault();
	  // if not all fields are filled out, alert the user
	  if (
		searchParams.from === '' ||
		searchParams.to === '' ||
		searchParams.departDate === '' ||
		searchParams.returnDate === '' ||
		searchParams.travelers === 0
	  ) {
		alert('Please fill out all fields');
		return;
	  }

	  // if the user is not logged in, redirect to login page
	  if (!localStorage.getItem('isLoggedIn')) {
		history('/login');
		return;
	  }

	  setText(JSON.stringify(searchParams));
	  history('/checkout');
	};

	const [searchParams, setSearchParams] = useState({
		from: '',
		to: '',
		departDate: '',
		returnDate: '',
		travelers: 1,
	});

	const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
	const [toSuggestions, setToSuggestions] = useState<string[]>([]);

	const from_destinations = [
		'Albania',
		'Argentina',
		'Australia',
		'Austria',
		// Add more destinations
	];

	const to_destinations = [
		'Paris',
		'Tokyo',
		'New York',
		'London',
		// Add more destinations
	];

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setSearchParams({
		...searchParams,
		[name]: value,
		});

		// if the return date is before the depart date and the depart date is not empty
		if (
		name === 'returnDate' &&
		new Date(value) < new Date(searchParams.departDate) &&
		searchParams.departDate !== ''
		) {
		alert('Return date must be after depart date');
		setSearchParams({
			...searchParams,
			returnDate: '',
		});
		}

		// Update suggestions based on the current input value
		if (name === 'from') {
		const fromSuggestions = filterDestinations(value, from_destinations);
		setFromSuggestions(fromSuggestions);
		} else if (name === 'to') {
		const toSuggestions = filterDestinations(value, to_destinations);
		setToSuggestions(toSuggestions);
		}
	};

	const filterDestinations = (inputValue: string, destinations: any[]) => {
		const inputValueLowerCase = inputValue.toLowerCase();
		return destinations.filter(
		(destination) => destination.toLowerCase().includes(inputValueLowerCase)
		);
	};

	const handleSuggestionClick = (name: string, suggestion: string) => {
		setSearchParams({
		...searchParams,
		[name]: suggestion,
		});

		if (name === 'from') {
		setFromSuggestions([]);
		} else if (name === 'to') {
		setToSuggestions([]);
		}
	};

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
        Search Flights
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="w-1/2 relative">
            <label htmlFor="from" className="block text-sm text-gray-600">
              From
            </label>
            <input
              type="text"
              id="from"
              name="from"
              value={searchParams.from}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {fromSuggestions.length > 0 && (
              <ul className="mt-2 absolute left-0 right-0 border border-gray-300 rounded shadow-md"  style={{backgroundColor: 'white'}}>
                {fromSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick('from', suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-1/2 relative">
            <label htmlFor="to" className="block text-sm text-gray-600">
              To
            </label>
            <input
              type="text"
              id="to"
              name="to"
              value={searchParams.to}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {toSuggestions.length > 0 && (
              <ul className="mt-2 absolute left-0 right-0 border border-gray-300 rounded shadow-md" style={{backgroundColor: 'white'}}>
                {toSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick('to', suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="w-1/2">
            <label htmlFor="departDate" className="block text-sm text-gray-600">
              Depart Date
            </label>
            <input
              type="date"
              id="departDate"
              name="departDate"
              value={searchParams.departDate}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="returnDate" className="block text-sm text-gray-600">
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={searchParams.returnDate}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="travelers" className="block text-sm text-gray-600">
            Travelers
          </label>
          <input
            type="number"
            id="travelers"
            name="travelers"
            value={searchParams.travelers}
            onChange={handleChange}
            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
