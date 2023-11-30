/**
 * The Navbar component
 * Displays the navbar
 */

const Navbar = () => {
	//  Function to handle logout
	function handleLogout(): void {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('flightData');
		window.location.reload();
	}

	// Check if the user is logged in
	function isLoggedIn(): boolean {
		return localStorage.getItem('isLoggedIn') === 'true';
	}

	return (
		<>
			<nav className="bg-gray-800 p-4">
				<div className="container mx-auto flex justify-between items-center">
					<div className="text-white font-bold text-xl">
						<img
							src="/workflow-mark-indigo-500.svg"
							alt="Workflow"
							className="inline w-10 mr-2"
						/>
						Travel Agency
					</div>
					<div className="flex items-center space-x-4">
						<a
							href="/"
							className="text-white hover:text-gray-300 transition duration-300"
						>
							Home
						</a>
						<a
							href="/dashboard"
							className="text-white hover:text-gray-300 transition duration-300"
						>
							Dashboard
						</a>
						{isLoggedIn() ? (
							<button
								onClick={handleLogout}
								className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600 transition duration-300"
							>
								Logout
							</button>
						) : (
							<a
								href="/login"
								className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600 transition duration-300"
							>
								Login
							</a>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
