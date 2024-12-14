import { getPocketBase } from "@/lib/pocketbase";
import { useLogout } from "@/hooks/useLogout";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";
import { Link, UserRoundPen, Settings, LogOut, LogIn } from "lucide-react";

export const NavbarPublic = ({ title, children }: { title: string; children: React.ReactNode }) => {
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