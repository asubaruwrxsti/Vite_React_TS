// SearchBar.tsx
import { useDestinations } from '@/hooks/useDestinations';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { travelDetailsState } from '@/store';
import { filterDestinations } from '@/lib/SearchBarUtils';
import { Destination } from '@/types/types';
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
import { formatDateForInput, parseInputDate } from '@/lib/utils';

const SearchBar = () => {
	// API-related hooks
	const { destinations, loading, error } = useDestinations();
	const [travelDetails, setTravelDetails] = useRecoilState(travelDetailsState);

	// Suggestion-related state
	const [fromSuggestions, setFromSuggestions] = useState<Destination[]>([]);
	const [toSuggestions, setToSuggestions] = useState<Destination[]>([]);
	const [showFromSuggestions, setShowFromSuggestions] = useState(false);
	const [showToSuggestions, setShowToSuggestions] = useState(false);

	// Form schema and validation
	const formSchema = z.object({
		from: z.string().min(1, {
			message: "From must be at least 1 character.",
		}),
		to: z.string().min(1, {
			message: "To must be at least 1 character.",
		}),
		departDate: z.date().min(new Date(), {
			message: "Departure date must be in the future.",
		}),
		returnDate: z.date(),
		travelers: z.number().int().min(1, {
			message: "At least 1 passenger is required",
		}).max(10, {
			message: "Maximum of 10 passengers allowed",
		}),
	}).refine((data) => {
		if (!data.departDate || !data.returnDate) return true;
		return data.returnDate >= data.departDate;
	}, {
		message: "Return date must be after departure date",
		path: ["returnDate"],
	});

	// Form initialization
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			from: travelDetails.from,
			to: travelDetails.to,
			departDate: new Date(),
			returnDate: new Date(),
			travelers: 1,
		},
	});

	// Form submission handler
	function handleTravelSubmit(values: z.infer<typeof formSchema>) {
		setTravelDetails({
			...travelDetails,
			from: values.from,
			to: values.to,
		});
		console.log(values);
	}

	// Loading states
	if (loading) return <div>Loading destinations...</div>;
	if (error) return <div>Error loading destinations: {error.message}</div>;

	return (
		<>
			<div className="flex flex-col items-center justify-center w-full p-4 md:p-6">
				<h2 className="text-xl md:text-2xl font-semibold mb-4">Make a reservation</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleTravelSubmit)} className="w-full max-w-[95%] md:max-w-md">
						<div className="bg-white shadow-xl rounded-xl flex flex-col p-4 md:p-8 space-y-4">

							{/* From field */}
							<div className='w-full'>
								<FormField
									control={form.control}
									name="from"
									render={({ field }) => (
										<FormItem>
											<FormLabel>From</FormLabel>
											<FormControl>
												<Input
													placeholder="From"
													{...field}
													onChange={(e) => {
														field.onChange(e);
														if (e.target.value.trim()) {
															setFromSuggestions(filterDestinations(e.target.value, destinations));
															setShowFromSuggestions(true);
														} else {
															setShowFromSuggestions(false);
														}
													}}
												/>
											</FormControl>
											<FormMessage />
											{showFromSuggestions && fromSuggestions.length > 0 && field.value && (
												<ul className="absolute z-10 bg-white shadow-lg rounded-b border">
													{fromSuggestions.map((suggestion) => (
														<li
															key={`${suggestion.code}-from`}
															className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
															onClick={() => {
																field.onChange(suggestion.name);
																setShowFromSuggestions(false);
															}}
														>
															{suggestion.name}
														</li>
													))}
												</ul>
											)}
										</FormItem>
									)}
								/>
							</div>

							{/* To field */}
							<div className='w-full'>
								<FormField
									control={form.control}
									name="to"
									render={({ field }) => (
										<FormItem>
											<FormLabel>To</FormLabel>
											<FormControl>
												<Input
													placeholder="To"
													{...field}
													onChange={(e) => {
														field.onChange(e);
														if (e.target.value.trim()) {
															setToSuggestions(filterDestinations(e.target.value, destinations));
															setShowToSuggestions(true);
														} else {
															setShowToSuggestions(false);
														}
													}}
												/>
											</FormControl>
											<FormMessage />
											{showToSuggestions && toSuggestions.length > 0 && field.value && (
												<ul className="absolute z-10 bg-white shadow-lg rounded-b border">
													{toSuggestions.map((suggestion) => (
														<li
															key={`${suggestion.code}-to`}
															className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
															onClick={() => {
																field.onChange(suggestion.name);
																setShowToSuggestions(false);
															}}
														>
															{suggestion.name}
														</li>
													))}
												</ul>
											)}
										</FormItem>
									)}
								/>
							</div>

							{/* Departure date field */}
							<div className='w-full'>
								<FormField
									control={form.control}
									name="departDate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Departure Date</FormLabel>
											<FormControl>
												<Input
													type="date"
													{...field}
													value={field.value ? formatDateForInput(field.value) : ''}
													onChange={(e) => field.onChange(parseInputDate(e.target.value))}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Return date field */}
							<div className='w-full'>
								<FormField
									control={form.control}
									name="returnDate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Return Date</FormLabel>
											<FormControl>
												<Input
													type="date"
													{...field}
													value={field.value ? formatDateForInput(field.value) : ''}
													onChange={(e) => field.onChange(parseInputDate(e.target.value))}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Travelers field */}
							<div className='w-full'>
								<FormField
									control={form.control}
									name="travelers"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Travelers</FormLabel>
											<FormControl>
												<Input type="number" placeholder="Travelers" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Submit button */}
							<Button
								type="submit"
								className='w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							>
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	);
};

export default SearchBar;