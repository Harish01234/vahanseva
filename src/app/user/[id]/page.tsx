'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '@/store/userstore';
import Link from 'next/link';

interface Ride {
    _id: string;
    pickupLocation: string;
    dropoffLocation: string;
    status: string;
}

interface User {
    id: string;
}

const PendingRides = () => {
    const { user } = useUserStore() as { user: User | null };
    const [pendingRides, setPendingRides] = useState<Ride[]>([]);
    const [enRouteRides, setEnRouteRides] = useState<Ride[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchPendingRides = async () => {
        if (!user?.id) {
            console.log('User ID not available');
            return;
        }

        try {
            const url = `/api/rides?customerId=${user.id}`;
            console.log("Fetching pending rides with URL:", url);
            const response = await axios.get<{ rides: Ride[] }>(url);
            console.log("Pending Rides API Response:", response.data);

            if (response.data && response.data.rides && response.data.rides.length > 0) {
                setPendingRides(response.data.rides);
                console.log("Pending rides fetched successfully:", response.data.rides);
            } else {
                console.log("No pending rides found.");
                setPendingRides([]);
            }
        } catch (err) {
            console.error("Error fetching pending rides:", err);
            setError((err as Error).message);
        }
    };

    const fetchEnRouteRides = async () => {
        if (!user?.id) {
            console.log('User ID not available');
            return;
        }

        try {
            const url = `/api/enroute?customerId=${user.id}`;
            console.log("Fetching en route rides with URL:", url);
            const response = await axios.get<{ rides: Ride[] }>(url);
            console.log("En Route Rides API Response:", response.data);

            if (response.data && response.data.rides && response.data.rides.length > 0) {
                setEnRouteRides(response.data.rides);
                console.log("En Route rides fetched successfully:", response.data.rides);
            } else {
                console.log("No en route rides found.");
                setEnRouteRides([]);
            }
        } catch (err) {
            console.error("Error fetching en route rides:", err);
            setError((err as Error).message);
        }
    };

    useEffect(() => {
        if (user?.id) {
            console.log('User ID found:', user.id);
            fetchPendingRides();
            fetchEnRouteRides();
        } else {
            console.log('User ID not available');
        }
    }, [user?.id]);

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen p-5 md:p-10">
            <h2 className="text-white text-3xl font-bold mb-6 text-center">Pending Rides</h2>
            {pendingRides.length === 0 ? (
                <p className="text-gray-400 text-lg text-center">No pending rides found.</p>
            ) : (
                <ul className="space-y-4">
                    {pendingRides.map((ride) => (
                        <li key={ride._id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                            <p className="text-white">Pickup: {ride.pickupLocation}</p>
                            <p className="text-white">Dropoff: {ride.dropoffLocation}</p>
                            <p className="text-white">Status: {ride.status}</p>
                        </li>
                    ))}
                </ul>
            )}

            <h2 className="text-white text-3xl font-bold mt-10 mb-6 text-center">En Route Rides</h2>
            {enRouteRides.length === 0 ? (
                <p className="text-gray-400 text-lg text-center">No en route rides found.</p>
            ) : (
                <ul className="space-y-4">
                    {enRouteRides.map((ride) => (
                        <li key={ride._id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                            <p className="text-white">Pickup: {ride.pickupLocation}</p>
                            <p className="text-white">Dropoff: {ride.dropoffLocation}</p>
                            <p className="text-white">Status: {ride.status}</p>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-8 flex justify-center">
                <Link href="/book-ride">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Book More Rides
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PendingRides;
