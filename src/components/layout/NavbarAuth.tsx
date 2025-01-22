import { Bell, CircleHelp, CircleUserRound, House, Settings } from 'lucide-react';
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { NavAuthRoutes } from '@/lib/constants';

export const NavbarAuth = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex gap-4 p-16 min-h-screen">
			{/* Icon Sidebar */}
			<nav className="sticky top-16 h-[calc(100vh-8rem)] flex flex-col justify-between p-4 shadow-lg rounded-2xl bg-white">
				<div className="flex flex-col gap-4">
					<IconButton icon={<CircleUserRound />} />
					<IconButton icon={<Bell />} />
					<IconButton icon={<Settings />} />
					<IconButton icon={<CircleHelp />} />
				</div>
				<IconButton icon={<House />} />
			</nav>

			{/* Settings Sidebar */}
			<aside className="sticky top-16 h-[calc(100vh-8rem)] w-80 flex flex-col p-8 shadow-lg rounded-2xl bg-white">
				<h2 className="text-3xl font-semibold pb-2 border-b">Settings</h2>
				<Input placeholder="Search" className="rounded-full mt-5" />

				<div className="flex flex-col gap-2 mt-5">
					{NavAuthRoutes.map((route, index) => (
						<SettingsLink key={index} icon={<route.icon />} title={route.name} link={route.path} />
					))}
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 bg-white shadow-xl rounded-2xl p-8">
				{children}
			</main>
		</div>
	);
};

const IconButton = ({ icon, className = "" }: { icon: React.ReactNode, className?: string }) => (
	<div className={`flex items-center justify-center rounded-full w-12 h-12 ${className}`}>
		{icon}
	</div>
);

const SettingsLink = ({ icon, title, link = "#" }: { icon: React.ReactNode, title: string, link?: string }) => (
	<Link
		to={link}
		className="group flex items-start gap-8 p-4 border-b hover:bg-gray-100 transition-all transform hover:scale-105 rounded-2xl duration-500 hover:shadow-lg"
	>
		{icon}
		<div className="flex flex-col">
			<span>{title}</span>
			<span className="text-sm text-gray-500">Setting description here</span>
		</div>
	</Link>
);