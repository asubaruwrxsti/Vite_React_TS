import DestinationList from '../components/DestinationList';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

const Home = () => {
	return (
		<div>
			<Navbar />
			<h1 className="text-3xl text-center mt-10">Welcome to our Travel Agency</h1>
			<SearchBar />
			<DestinationList />
			<div className="h-20"></div>
			<Footer />
		</div>
	);
};

export default Home;
