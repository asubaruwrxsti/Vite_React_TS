import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
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
import { ArrowUp, LogIn, LogOut, Settings, UserPen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './components/ui/button';
import { useLogout } from './hooks/useLogout';


/**
 * The main App component
 * Handles routing
 */

const PageWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
	const pb = getPocketBase();
	const user = pb.authStore.model;
	const logout = useLogout();

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
							<Popover>
								<PopoverTrigger>
									<Avatar>
										<AvatarImage
											src={user.avatar ? `${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}` : "https://github.com/shadcn.png"}
											className='rounded-full'
										/>
										<AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
									</Avatar>
								</PopoverTrigger>
								<PopoverContent>
									<div className="grid gap-4">
										<div className="space-y-2">
											<h4 className="font-medium leading-none">{user.name}</h4>
											<p className="text-sm text-muted-foreground">
												{user.email}
											</p>
										</div>
										<div className="grid gap-2">
											<div className="grid grid-cols-1 items-center gap-4">
												<Link to="/profile" className="col-span-2">
													<Button variant="outline" className='w-full'>
														<UserPen /> Profile
													</Button>
												</Link>
												<Link to="/settings" className="col-span-2">
													<Button variant="outline" className='w-full'>
														<Settings /> Settings
													</Button>
												</Link>
												<Button className="col-span-2" variant="destructive" onClick={logout}>
													<LogOut /> Logout
												</Button>
											</div>
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				) || !user && title !== 'Login' && (
					<div className="flex items-center gap-4">
						<Link to="/login" className="col-span-2">
							<Button variant="outline" className='w-full'>
								<LogIn /> Login
							</Button>
						</Link>
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
