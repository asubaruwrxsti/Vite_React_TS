import DestinationList from '../components/DestinationList';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <h2>Welcome to our Travel Agency</h2>
      <DestinationList />
    </div>
  );
};

export default Home;
