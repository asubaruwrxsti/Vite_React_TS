import { Button } from "@/components/ui/button";
import { BellRing, Check, RadioTower, ReceiptText, ShieldEllipsis } from "lucide-react";

/**
 * The Home page
 * Displays the search bar and the list of destinations
 */

const Home = () => {
	return (
		<>
			<div
				className="p-16 bg-gray-800 text-white shadow-xl rounded-2xl"
				style={{
					background: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(/home_background.webp) no-repeat center center/cover`,
				}}
			>
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					Automatic Toll Collection System
				</h2>
				<p className="text-lg mt-4">
					Welcome to the Automatic Toll Collection System. We provide a seamless experience for toll collection.
				</p>
				<div className="flex justify-center gap-16 mt-8">
					<Button className="text-lg px-6 py-6 transition-all duration-500 ease-in-out hover:scale-105">
						Get Started
					</Button>
					<Button
						variant="secondary"
						className="text-lg px-6 py-6 transition-all duration-500 ease-in-out hover:scale-105"
					>
						Learn More
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
				<div className="container">
					<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
						How it Works
					</h2>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						<li><p className="text-xl text-muted-foreground">Register your beacon(s).</p></li>
						<li><p className="text-xl text-muted-foreground">Connect your payment method.</p></li>
						<li><p className="text-xl text-muted-foreground">Select the toll access points.</p></li>
						<li><p className="text-xl text-muted-foreground">Enjoy your automated access.</p></li>
					</ul>
					<Button
						variant="secondary"
						className="text-lg px-6 py-6 transition-all duration-500 ease-in-out hover:scale-105"
					>
						Learn More
					</Button>
				</div>
				<div className="container">
					<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
						Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
						<p className="text-xl text-muted-foreground flex items-center gap-2 border rounded-2xl p-4">
							<RadioTower className="w-6 h-6" />
							Beacon Management
						</p>
						<p className="text-xl text-muted-foreground flex items-center gap-2 border rounded-2xl p-4">
							<ShieldEllipsis className="w-6 h-6" />
							Security
						</p>
						<p className="text-xl text-muted-foreground flex items-center gap-2 border rounded-2xl p-4">
							<ReceiptText className="w-6 h-6" />
							Automated Billing
						</p>
						<p className="text-xl text-muted-foreground flex items-center gap-2 border rounded-2xl p-4">
							<BellRing className="w-6 h-6" />
							Notifications
						</p>
					</div>
				</div>
			</div>
			<div className="container mt-8">
				<h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="border rounded-xl p-6 hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105 flex flex-col min-h-[400px]">
						<div>
							<h3 className="text-2xl font-bold text-center">Basic</h3>
							<div className="text-center my-4">
								<span className="text-4xl font-bold">$29</span>
								<span className="text-gray-500">/month</span>
							</div>
							<ul className="space-y-3">
								<li className="flex items-center">
									<Check className="w-5 h-5 text-green-500 mr-2" />
									Basic toll management
								</li>
								<li className="flex items-center">
									<Check className="w-5 h-5 text-green-500 mr-2" />
									Up to 2 vehicles
								</li>
								<li className="flex items-center">
									<Check className="w-5 h-5 text-green-500 mr-2" />
									Email support
								</li>
							</ul>
						</div>
						<div className="mt-auto">
							<Button className="w-full">Get Started</Button>
						</div>
					</div>

					<div className="border rounded-xl p-6 bg-primary text-primary-foreground hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 flex flex-col min-h-[400px]">
						<h3 className="text-2xl font-bold text-center">Pro</h3>
						<div className="text-center my-4">
							<span className="text-4xl font-bold">$79</span>
							<span className="text-primary-foreground/80">/month</span>
						</div>
						<ul className="space-y-3 mb-6">
							<li className="flex items-center">
								<Check className="w-5 h-5 mr-2" />
								Advanced toll management
							</li>
							<li className="flex items-center">
								<Check className="w-5 h-5 mr-2" />
								Up to 10 vehicles
							</li>
							<li className="flex items-center">
								<Check className="w-5 h-5 mr-2" />
								Priority support
							</li>
							<li className="flex items-center">
								<Check className="w-5 h-5 mr-2" />
								Analytics dashboard
							</li>
						</ul>
						<div className="mt-auto">
							<Button className="w-full border-2 border-white">Get Started</Button>
						</div>
					</div>

					<div className="border rounded-xl p-6 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 flex flex-col min-h-[400px]">
						<h3 className="text-2xl font-bold text-center">Enterprise</h3>
						<div className="text-center my-4">
							<span className="text-4xl font-bold">$199</span>
							<span className="text-gray-500">/month</span>
						</div>
						<ul className="space-y-3 mb-6">
							<li className="flex items-center">
								<Check className="w-5 h-5 text-green-500 mr-2" />
								Custom toll management
							</li>
							<li className="flex items-center">
								<Check className="w-5 h-5 text-green-500 mr-2" />
								Unlimited vehicles
							</li>
							<li className="flex items-center">
								<Check className="w-5 h-5 text-green-500 mr-2" />
								24/7 dedicated support
							</li>
							<li className="flex items-center">
								<Check className="w-5 h-5 text-green-500 mr-2" />
								Custom integrations
							</li>
						</ul>
						<div className="mt-auto">
							<Button className="w-full">Contact Sales</Button>
						</div>
					</div>
				</div>
			</div >
		</>
	);
};

export default Home;
