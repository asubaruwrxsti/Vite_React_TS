import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  return (
	<Router>
	  <Routes>
		<Route path="/" element={<Home />} />
		<Route
		  path="/dashboard"
		  element={
			isLoggedIn ? (
			  <Dashboard />
			) : (
			  <Navigate to="/login" />
			)
		  }
		/>
		<Route
		  path="/login"
		  element={
			isLoggedIn ? (
			  <Navigate to="/dashboard" />
			) : (
			  <Login onLogin={() => setIsLoggedIn(true)} />
			)
		  }
		/>
	  </Routes>
	</Router>
  );
};

export default App;
