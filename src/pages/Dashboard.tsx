import { getPocketBase } from '@/lib/pocketbase';
import { useEffect, useState } from 'react';
import { SubscriptionRecord } from '@/types/types';

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
            const subscription = await pb.collection('subscription').getOne<SubscriptionRecord>(userModel?.id);
			setSubsciptionObj(subscription);
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

		</div>
	);
};

export default Dashboard;
