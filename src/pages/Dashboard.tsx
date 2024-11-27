import { getPocketBase } from '@/lib/pocketbase';
import { useEffect, useState } from 'react';
import { SubscriptionRecord } from '@/types/types';
import { CURRENCY } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

/**
 * The Dashboard page
 * Displays the booked flights
 */

const Dashboard = () => {
	const pb = getPocketBase();
	const userModel = pb.authStore.model;
	const [subsciptionObj, setSubsciptionObj] = useState<SubscriptionRecord | null>(null);

	const fetchRecords = async () => {
		try {
			const subscriptions = await pb.collection('subscription').getList<SubscriptionRecord>(1, 1, {
				filter: `owner.id = "${userModel?.id}"`,
				expand: 'type',
			});
			setSubsciptionObj(subscriptions.items[0]);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (userModel?.id) {
			fetchRecords();
		}
	}, [userModel?.id]);

	console.log(subsciptionObj);

	return (
		<div>
			{subsciptionObj && (
				<div>
					<h2 className="text-2xl font-bold">Subscription Details</h2>
					<div className="m-4 p-4 bg-primary/10 rounded-lg">
						<p>Subscription Type: {subsciptionObj.expand.type.name}</p>
						<p>Subscription Price: {subsciptionObj.expand.type.price} {CURRENCY}</p>
						<p>Subscription Valid Until: {formatDate(subsciptionObj.valid_until)}</p>
					</div>
				</div>
			)}

		</div>
	);
};

export default Dashboard;
