import { AppWindowMac, Bell, CircleHelp, CircleUserRound, House, KeyRound, PictureInPicture2, Radio, Settings, UserRound } from 'lucide-react';
import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input"

export const NavbarAuth = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="p-16">
			<div className="flex">
				<div className="sticky top-5 z-40 flex flex-col justify-between items-center p-4 mr-4 shadow-lg rounded-2xl bg-white max-h-[75vh]">
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
				<div className="sticky top-5 z-40 flex flex-col justify-between items-center p-8 ml-4 mr-4 shadow-lg rounded-2xl w-1/5 max-h-[75vh]">
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
				<div className="bg-white shadow-xl rounded-2xl p-8 ml-4 flex-1 h-full">
					{children}
				</div>
			</div>
		</div>
	);
}