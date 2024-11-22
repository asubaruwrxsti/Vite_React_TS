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
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

/**
 * The main App component
 * Handles routing
 */

const PageWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
	const pb = getPocketBase();
	const user = pb.authStore.model;

	return (
		<div className="p-16">
			<div className="sticky top-5 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center p-8 shadow-lg rounded-2xl">
				<div className="flex items-center">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{title}
					</h1>
				</div>

				{user && (
					<div className="flex items-center gap-4">
						<span className="text-lg font-medium">Hello {user.name}!</span>
						<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
							<Avatar>
								<AvatarImage
									src={user.avatar ? `${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}` : "https://github.com/shadcn.png"}
									className='rounded-full'
								/>
								<AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
							</Avatar>
						</div>
					</div>
				)}
			</div>
			<div className="bg-white shadow-xl rounded-2xl p-8 m-8">
				{children}
			</div>
		</div>
	);
};

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
				<SidebarTrigger className='m-2'>Menu</SidebarTrigger>
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
				<ScrollToTop />
				<Footer />
			</AlertProvider>
		</RecoilRoot>
	);
};

export default App;
