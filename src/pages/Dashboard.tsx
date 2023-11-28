import Navbar from '../components/Navbar';

type DashboardProps = {
  onLogout: () => void;
};

const Dashboard = ({ onLogout }: DashboardProps) => {
  return (
    <div>
      <Navbar isLoggedIn={true} onLogout={onLogout} />
      <h2>Dashboard</h2>
      {/* Add more dashboard features */}
    </div>
  );
};

export default Dashboard;
