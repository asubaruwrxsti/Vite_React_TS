import DestinationList from '../components/lists/DestinationList';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import SearchBar from '../components/SearchBar';

/**
 * The Home page
 * Displays the search bar and the list of destinations
 */

const Home = () => {
	return (
		<>
			<Navbar />
			<h1 className="text-3xl text-center m-20">Welcome to our Travel Agency</h1>
			<div className="flex flex-col md:flex-row justify-center gap-4 container mx-auto px-4">
				<div className="w-full md:flex-1">
					<SearchBar />
				</div>
				<div className="w-full md:flex-1">
					<DestinationList />
				</div>
			</div>
			<div className="h-20"></div>
			<Footer />
		</>
	);
};

export default Home;
