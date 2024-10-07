'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '@/store/userstore';
import Link from 'next/link'; // Import Link from Next.js

// Define the structure of a Ride
interface Ride {
    _id: string;
    pickupLocation: string;
    dropoffLocation: string;
    status: string;
}

// Define the structure of the User
interface User {
    id: string; // Assuming the user ID is a string
}

const PendingRides = () => {
    const { user } = useUserStore() as { user: User | null }; // Cast user store to expected type
    const [rides, setRides] = useState<Ride[]>([]); // Set the type of rides
    const [error, setError] = useState<string | null>(null); // Set the type for error

    const fetchPendingRides = async () => {
        try {
            // Construct the API URL using user.id as customerId
            const url = `/api/rides?customerId=${user?.id || ''}`; // Append customerId if provided

            // Fetch rides from the API
            const response = await axios.get<Ride[]>(url); // Specify the expected response type
            setRides(response.data);
        } catch (err) {
            console.error("Error fetching rides:", err);
            setError((err as Error).message); // Cast error to Error type to access message
        }
    };

    useEffect(() => {
        if (user?.id) { // Fetch rides only if user ID is available
            fetchPendingRides();
        }
    }, [user?.id]); // Re-fetch rides whenever user.id changes

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    const assinrider=()=>{
        console.log("assigning rider");
        const response = axios.post('/api/rides/assign', {rideId: 'rideId'})
    }


    return (
        <div className="bg-black min-h-screen p-5 md:p-10">
            <h2 className="text-white text-3xl font-bold mb-6 text-center">Pending Rides</h2>
            {rides.length === 0 ? (
                <p className="text-gray-400 text-lg text-center">No pending rides found.</p>
            ) : (
                <ul className="space-y-4">
                    {rides.map((ride) => (
                        <li key={ride._id} className="bg-gray-800 p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <p className="text-white font-semibold">Ride ID: <span className="font-normal">{ride._id}</span></p>
                            <p className="text-gray-300">Pickup: <span className="font-normal">{ride.pickupLocation}</span></p>
                            <p className="text-gray-300">Dropoff: <span className="font-normal">{ride.dropoffLocation}</span></p>
                            <p className="text-gray-300">Status: <span className="font-normal">{ride.status}</span></p>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-8 flex justify-center">
                <Link href="/book-ride">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Book More Rides
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PendingRides;
