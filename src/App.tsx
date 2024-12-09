import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AlertProvider } from './contexts/AlertContext';
import { getPocketBase } from './lib/pocketbase';
import { ProtectedRoute } from './components/ProtectedRoute';
import Footer from './components/layout/Footer';
import { AppRoutes } from './lib/constants';
import { useEffect, useState } from 'react';
import { AppWindowMac, ArrowUp, Bell, CircleHelp, CircleUserRound, House, KeyRound, LogIn, LogOut, PictureInPicture2, Radio, Settings, UserRound, UserRoundPen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './components/ui/button';
import { useLogout } from './hooks/useLogout';
import { Input } from "@/components/ui/input"


/**
 * The main App component
 * Handles routing
 */

const PageWrapper_Common = ({ title, children }: { title: string; children: React.ReactNode }) => {
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
														<UserRoundPen /> Profile
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

const PageWrapper_Auth = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="p-16">
			<div className="flex">
				<div className="sticky top-5 z-40 flex flex-col justify-between items-center p-4 mr-4 shadow-lg rounded-2xl bg-white">
					<div className="flex flex-col items-center w-full h-full">
						<div className="flex items-center justify-center rounded-full w-12 h-12">
							<CircleUserRound />
						</div>

						<div className="flex items-center justify-center rounded-full w-12 h-12">
							<Bell /> {/* <BellDot /> */}
						</div>

						<div className="flex items-center justify-center rounded-full w-12 h-12">
							<Settings />
						</div>

						<div className="flex items-center justify-center rounded-full w-12 h-12">
							<CircleHelp />
						</div>

						<div className="flex items-center justify-center rounded-full w-12 h-12 mt-auto">
							<House />
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-between items-center p-8 ml-4 mr-4 shadow-lg rounded-2xl w-1/5">
					<div className="flex flex-col w-full h-full">
						<h2 className="mt-10 mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
							Settings
						</h2>
						<Input placeholder="Search" className='rounded-full' />
						<div className="flex flex-col mt-5">
							<Link to="#" className="group flex items-start gap-8 mb-2 border-b p-4 hover:bg-gray-100 transition-all transform hover:scale-105 rounded-2xl duration-500 hover:shadow-lg">
								<UserRound />
								<div className="flex flex-col">
									<span>Profile</span>
									<span className="text-sm text-gray-500">Setting description here</span>
								</div>
							</Link>
							<Link to="#" className="group flex items-start gap-8 mb-2 border-b p-4 hover:bg-gray-100 transition-all transform hover:scale-105 rounded-2xl duration-500 hover:shadow-lg">
								<PictureInPicture2 />
								<div className="flex flex-col">
									<span>Subscription</span>
									<span className="text-sm text-gray-500">Setting description here</span>
								</div>
							</Link>
							<Link to="#" className="group flex items-start gap-8 mb-2 border-b p-4 hover:bg-gray-100 transition-all transform hover:scale-105 rounded-2xl duration-500 hover:shadow-lg">
								<Radio />
								<div className="flex flex-col">
									<span>Beacon</span>
									<span className="text-sm text-gray-500">Setting description here</span>
								</div>
							</Link>
							<Link to="#" className="group flex items-start gap-8 mb-2 border-b p-4 hover:bg-gray-100 transition-all transform hover:scale-105 rounded-2xl duration-500 hover:shadow-lg">
								<AppWindowMac />
								<div className="flex flex-col">
									<span>App configuration</span>
									<span className="text-sm text-gray-500">Setting description here</span>
								</div>
							</Link>
							<Link to="#" className="group flex items-start gap-8 mb-2 border-b p-4 hover:bg-gray-100 transition-all transform hover:scale-105 rounded-2xl duration-500 hover:shadow-lg">
								<Bell />
								<div className="flex flex-col">
									<span>Notification</span>
									<span className="text-sm text-gray-500">Setting description here</span>
								</div>
							</Link>
							<Link to="#" className="group flex items-start gap-8 mb-2 border-b p-4 hover:bg-gray-100 transition-all transform hover:scale-105 rounded-2xl duration-500 hover:shadow-lg">
								<KeyRound />
								<div className="flex flex-col">
									<span>Privacy</span>
									<span className="text-sm text-gray-500">Setting description here</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<div className="bg-white shadow-xl rounded-2xl p-8 ml-4 flex-1">
					{children}
				</div>
			</div>
		</div>
	);
}

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
										<PageWrapper_Auth>
											<Component />
										</PageWrapper_Auth>
									</ProtectedRoute>
								) : (
									<>
										<PageWrapper_Common title={name}>
											<Component />
										</PageWrapper_Common>
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
