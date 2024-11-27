import { getPocketBase } from '@/lib/pocketbase';
import { useEffect, useState } from 'react';
import { BeaconRecord, SubscriptionRecord, UserRecord } from '@/types/types';
import { CURRENCY } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { ListResult } from 'pocketbase';

/**
 * The Dashboard page
 * Displays the booked flights
 */

const Dashboard = () => {
	const pb = getPocketBase();
	const userModel = pb.authStore.model;
	const [subscriptionObj, setsubscriptionObj] = useState<SubscriptionRecord | null>(null);
	const [beaconsObj, setBeaconsObj] = useState<ListResult<BeaconRecord> | null>(null);

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
					<div className="flex flex-col items-start gap-4 w-1/3">
						<h2 className="text-2xl font-bold mb-2">Subscription Details</h2>
						<div className="p-4 bg-primary/10 rounded-lg text-left shadow-lg">
							<p>Subscription Type: {subscriptionObj.expand.type.name}</p>
							<p>Subscription Price: {subscriptionObj.expand.type.price} {CURRENCY}</p>
							<p>Subscription Valid Until: {formatDate(subscriptionObj.valid_until)}</p>
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
