import { zodResolver } from "@hookform/resolvers/zod"
import { Terminal } from 'lucide-react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { useAlert } from '@/hooks/useAlert';
import { getPocketBase } from '@/lib/pocketbase';
import { AlertType } from '@/lib/utils/AlertContextUtils';


/**
 * The Login component
 * Displays the login form
 */

const Login = () => {
	const navigate = useNavigate();
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
	async function handleLogin(values: z.infer<typeof formSchema>) {
		try {
			await getPocketBase().collection('users').authWithPassword(values.username, values.password)
			showAlert('Success', "Login successful", { type: AlertType.Success });
			navigate('/');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			showAlert('Error', errorMessage, { type: AlertType.Error });
			return;
		}
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<div className="w-full max-w-md">
					<Alert className="bg-red-500 text-white px-4 py-4">
						<Terminal className="h-4 w-4" stroke='white' />
						<AlertTitle>Heads up!</AlertTitle>
						<AlertDescription>
							Please login to continue
						</AlertDescription>
					</Alert>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8 w-full max-w-md">
						<div className="bg-white border rounded-lg px-8 pt-6 pb-8 mb-4 mt-4 flex flex-col border-gray-300">
							<div className='col-span-6'>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="Type your username here ..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='col-span-6 mt-4'>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input placeholder="Type your password here ..." {...field} />
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
