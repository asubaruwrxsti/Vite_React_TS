import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { getPocketBase } from '@/lib/pocketbase';
import { useAlert } from '@/hooks/useAlert';
import { AlertType } from '@/lib/utils/AlertContextUtils';

/**
 * The Navbar component
 * Displays the navbar
 */

const Navbar = () => {
	// Constant to handle the scroll effect and navigation
	const [isScrolled, setIsScrolled] = useState(false);
	
	const navigate = useNavigate();
	const { showAlert } = useAlert();

	// Function to handle logout
	function handleLogout(): void {
		getPocketBase().authStore.clear();
		showAlert('Logout Successful', 'You have successfully logged out!', { type: AlertType.Success });
		navigate('/');
	}

	// Check if the user is logged in
	function isLoggedIn(): boolean {
		return getPocketBase().authStore.isValid;
	}

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<nav
			className={`${isScrolled ? 'bg-gray-800 bg-opacity-50 p-4' : 'bg-gray-800 bg-opacity-80 p-6 h-24'
				} sticky top-0 z-50 backdrop-blur-md transition-all duration-500 shadow-md flex justify-between items-center`}
		>
			<div className="container mx-auto flex justify-between items-center">
				{/* Logo section */}
				<div className={`flex items-center text-white font-bold transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'
					}`}>
					<img
						src="/workflow-mark-indigo-500.svg"
						alt="Workflow"
						className="w-10 mr-2"
					/>
					<span>Tolls Stuff</span>
				</div>

				{/* Navigation links */}
				<div className="flex items-center space-x-6">
					<a
						href="/"
						className={`text-white hover:text-gray-300 transition-all duration-300 ${isScrolled ? 'text-base' : 'text-lg'
							}`}
					>
						Home
					</a>
					<a
						href="/dashboard"
						className={`text-white hover:text-gray-300 transition-all duration-300 ${isScrolled ? 'text-base' : 'text-lg'
							}`}
					>
						Dashboard
					</a>
					{isLoggedIn() ? (
						<Button
							onClick={handleLogout}
							className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600 transition duration-300"
						>
							Logout
						</Button>
					) : (
						<Button
							onClick={() => navigate('/login')}
							className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600 transition duration-300"
						>
							Login
						</Button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;