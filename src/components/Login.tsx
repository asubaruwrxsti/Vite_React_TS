import { useState } from 'react';
import Navbar from './Navbar';

type LoginProps = {
	onLogin: () => void;
};

/**
 * The Login component
 * Displays the login form
 */

const Login = ({ onLogin }: LoginProps) => {
	// Define the username and password
	// Use state to store the username and password
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// Handle the login
	const handleLogin = () => {
		// If the username and password are present, set the isLoggedIn flag to true
		// Normally, this would be done by making a call to the backend
		if (username && password) {
			localStorage.setItem('isLoggedIn', 'true');
			onLogin();
		} else {
			alert('Please enter username and password');
		}
	};

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center justify-center">
				<div className="bg-red-500 text-white px-4 py-4 rounded mb-4 mt-2">
					<div>Please login to continue</div>
				</div>
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
					<div className='col-span-6 sm:col-span-3'>
						<label htmlFor='username' className='block text-sm font-medium text-gray-700'>
							Username
						</label>
						<input
							type='text'
							name='username'
							id='username'
							autoComplete='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className='mt-3 block w-full shadow-sm sm:text-sm border-gray-300'
						/>
					</div>
					<div className='col-span-6 sm:col-span-3'>
						<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
							Password
						</label>
						<input
							type='password'
							name='password'
							id='password'
							autoComplete='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='mt-3 block w-full shadow-sm sm:text-sm border-gray-300'
						/>
					</div>
					<button onClick={handleLogin}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline'
					>
						Login
					</button>
				</div>
			</div>
		</>
	);
};

export default Login;
