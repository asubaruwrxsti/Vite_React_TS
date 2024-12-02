import { getPocketBase } from '@/lib/pocketbase';
import { useEffect, useState } from 'react';
import { BeaconRecord, PaymentInfoRecord, SubscriptionRecord } from '@/types/types';
import { CURRENCY } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { ListResult } from 'pocketbase';
import { calculateNextPayment } from '@/lib/utils/DashboardUtils';
import { WalletCards } from 'lucide-react';

/**
 * The Dashboard page
 * Displays the booked flights
 */

const Dashboard = () => {
	const pb = getPocketBase();
	const userModel = pb.authStore.model;
	const [subscriptionObj, setsubscriptionObj] = useState<SubscriptionRecord | null>(null);
	const [beaconsObj, setBeaconsObj] = useState<ListResult<BeaconRecord> | null>(null);
	const [paymentMethodObj, setPaymentMethodObj] = useState<PaymentInfoRecord | null>(null);

	const fetchRecords = async () => {
		try {
			const subscriptions = await pb.collection('subscription').getList<SubscriptionRecord>(1, 1, {
				filter: `owner.id = "${userModel?.id}"`,
				expand: 'type',
			});
			setsubscriptionObj(subscriptions.items[0]);

			const beacons = await pb.collection('beacons').getList<BeaconRecord>(1, 10, {
				filter: `owner.id = "${userModel?.id}"`,
				expand: 'owner'
			});
			setBeaconsObj(beacons);

			const paymentInfo = await pb.collection('payment_info').getList<PaymentInfoRecord>(1, 10, {
				filter: `owner.id = "${userModel?.id}" && favorite = true`,
				expand: 'owner'
			});
			setPaymentMethodObj(paymentInfo.items[0]);
			console.log('paymentInfo', paymentInfo);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (userModel?.id) {
			fetchRecords();
		}
	}, [userModel?.id]);

	return (
		<div>
			{subscriptionObj && (
				<div className="flex flex-row justify-between gap-4">
					<div className="flex flex-col items-start">
						<div className="p-4 rounded-lg text-left shadow-lg p-8">
							<div className="flex flex-row items-center gap-4 mb-4 pb-2 border-b">
								<WalletCards className='p-2 bg-[#4338ca] rounded-lg text-white' size={32} />
								<h2 className="text-2xl font-bold">Subscription Details</h2>
							</div>
							<div className="grid grid-cols-2">
								<div className="p-4 rounded-lg col-span-2 flex flex-row justify-between gap-2">
									<p className="font-semibold">Subscription Type:</p>
									<p>{subscriptionObj.expand.type.name}</p>
								</div>
								<div className="border p-4 rounded-lg col-span-2 flex flex-row justify-between gap-2">
									<p className="font-semibold">{subscriptionObj.expand.type.price} {CURRENCY}</p>
									<p>on {formatDate(calculateNextPayment(subscriptionObj.created, subscriptionObj.expand.type.payment_interval.toLowerCase()), false)}</p>
								</div>
								<div className="p-4 rounded-lg col-span-2 flex flex-row justify-between gap-2">
									<p className="font-semibold">Subscription Valid Until:</p>
									<p>{formatDate(subscriptionObj.valid_until, false)}</p>
								</div>
								<div className="p-4 rounded-lg col-span-2 flex flex-row justify-between gap-2">
									<p className="font-semibold">Card ending in:</p>
									<p>{'**** **** **** ' + paymentMethodObj?.credit_card_number.slice(-4)}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col items-start gap-4 w-2/3">
						<h2 className="text-2xl font-bold mb-2">Active Beacons</h2>
						<div className="flex flex-row flex-wrap gap-4">
							{beaconsObj?.items.map((beacon) => (
								<div key={beacon.id} className="flex flex-col gap-2 p-4 bg-primary/10 rounded-lg text-left shadow-lg">
									<p>Beacon Name: {beacon.name}</p>
									<p>Status: {beacon.active ? 'Active' : 'Inactive'}</p>
									<p>Last Seen: {formatDate(beacon.last_seen)}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
