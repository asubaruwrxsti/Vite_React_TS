import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ProtectedRoute } from './components/ProtectedRoute';
import Footer from './components/layout/Footer';
import { NavbarAuth } from './components/layout/NavbarAuth';
import { NavbarPublic } from './components/layout/NavbarPublic';
import { AlertProvider } from './contexts/AlertContext';
import { AppRoutes } from './lib/constants';
import { getPocketBase } from './lib/pocketbase';



/**
 * The main App component
 * Handles routing
 */

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<button
			onClick={scrollToTop}
			className={`
		  fixed bottom-8 right-8 p-3 
		  bg-primary text-primary-foreground rounded-full shadow-lg
		  transition-all duration-300 
		  hover:scale-110
		  ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
		`}
		>
			<ArrowUp className="w-6 h-6" />
		</button>
	);
};

const AppLayout = () => {
	const isLoggedIn = getPocketBase().authStore.isValid;

	return (
		<>
			<main>
				<Routes>
					{AppRoutes.map(({ path, name, element: Component, protected: isProtected, redirectIfLoggedIn }) => (
						<Route
							key={path}
							path={path}
							element={
								redirectIfLoggedIn && isLoggedIn ? (
									<Navigate to="/" />
								) : isProtected ? (
									<ProtectedRoute>
										<NavbarAuth>
											<Component />
										</NavbarAuth>
									</ProtectedRoute>
								) : (
									<>
										<NavbarPublic title={name}>
											<Component />
										</NavbarPublic>
										<Footer />
									</>
								)
							}
						/>
					))}
				</Routes>
			</main>
		</>
	);
};

const App = () => {
	return (
		<RecoilRoot>
			<AlertProvider>
				<Router>
					<AppLayout />
				</Router>
				<ScrollToTop />
			</AlertProvider>
		</RecoilRoot>
	);
};

export default App;
