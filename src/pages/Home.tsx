import DestinationList from '../components/DestinationList';
import Navbar from '../components/Navbar';

function isLoggedIn(): boolean {
  return localStorage.getItem('isLoggedIn') === 'true';
}

function handleLogout(): void {
  localStorage.removeItem('isLoggedIn');
  // setIsLoggedIn(false);
}

const Home = () => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn()} onLogout={handleLogout}/>
      <h2>Welcome to our Travel Agency</h2>
      <DestinationList />
    </div>
  );
};

export default Home;
