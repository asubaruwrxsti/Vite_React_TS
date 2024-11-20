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
		<div>
			<Navbar />
			<h1 className="text-3xl text-center mt-10">Welcome to our Travel Agency</h1>
			<div className="flex">
				<SearchBar />
				<DestinationList />
			</div>
			<div className="h-20"></div>
			<Footer />
		</div>
	);
};

export default Home;
