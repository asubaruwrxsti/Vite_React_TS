import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Checkout from './pages/Checkout';
import { RecoilRoot } from 'recoil';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  return (
	<RecoilRoot>
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
					<Navigate to="/home" />
					) : (
					<Login onLogin={() => setIsLoggedIn(true)} />
					)
				}
				/>
				<Route
				path="/checkout"
				element={
					isLoggedIn ? (
					<Checkout />
					) : (
					<Navigate to="/" />
					)
				}
				/>
			</Routes>
		</Router>
	</RecoilRoot>
  );
};

export default App;
