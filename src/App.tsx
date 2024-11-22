import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AlertProvider } from './contexts/AlertContext';
import { getPocketBase } from './lib/pocketbase';
import { ProtectedRoute } from './components/ProtectedRoute';
import Footer from './components/layout/Footer';
import { AppRoutes } from './lib/constants';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/layout/AppSidebar';
import { useSidebar } from './components/ui/sidebar';

/**
 * The main App component
 * Handles routing
 */

const PageWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<div className="p-16">
		<h2 className="text-2xl font-bold">{title}</h2>
		{children}
	</div>
);

const AppLayout = () => {
	const { open } = useSidebar();
	const isLoggedIn = getPocketBase().authStore.isValid;

	return (
		<>
			<div style={{
				position: 'fixed',
				top: 0,
				left: 0,
				height: '100vh',
				zIndex: 1000,
				display: 'flex',
				alignItems: 'flex-start'
			}}>
				<AppSidebar />
				<SidebarTrigger className='m-2 rounded-r-lg'></SidebarTrigger>
			</div>
			{open && (
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					backdropFilter: 'blur(4px)',
					zIndex: 999,
					transition: 'all 0.3s ease-in-out'
				}} />
			)}
			<main style={{
				transition: 'all 0.3s ease-in-out',
				filter: open ? 'blur(4px)' : 'none',
			}}>
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
										<PageWrapper title={name}>
											<Component />
										</PageWrapper>
									</ProtectedRoute>
								) : (
									<PageWrapper title={name}>
										<Component />
									</PageWrapper>
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
				<SidebarProvider defaultOpen={false}>
					<Router>
						<AppLayout />
					</Router>
				</SidebarProvider>
				<Footer />
			</AlertProvider>
		</RecoilRoot>
	);
};

export default App;
