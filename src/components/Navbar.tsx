function handleLogout(): void {
	localStorage.removeItem('isLoggedIn');
	window.location.reload();
}

function isLoggedIn(): boolean {
	  return localStorage.getItem('isLoggedIn') === 'true';
}

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Travel Agency</div>
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
