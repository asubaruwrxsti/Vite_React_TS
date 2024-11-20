import Navbar from './layout/Navbar';
import { useAlert } from '@/hooks/useAlert';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

/**
 * The Login component
 * Displays the login form
 */

const Login = () => {
	// useAlert hook to show alerts
	const { showAlert } = useAlert();

	// Define the form schema
	const formSchema = z.object({
		username: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		password: z.string().min(2, {
			message: "Password must be at least 2 characters.",
		}),
	})

	// Define the form resolver
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	})

	// Handle the form submit
	function handleLogin(values: z.infer<typeof formSchema>) {
		showAlert('Login', `Username: ${values.username}, Password: ${values.password}`);
	};

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center justify-center">
				<div className="bg-red-500 text-white px-4 py-4 rounded mb-4 mt-2">
					<div>Please login to continue</div>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8 w-full max-w-md">
						<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
							<div className='col-span-6'>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="Username" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='col-span-6'>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input placeholder="Password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline'
							>Submit</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	);
};

export default Login;
