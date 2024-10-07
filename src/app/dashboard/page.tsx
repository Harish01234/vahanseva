'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '@/store/userstore';

interface User {
    id: string;
    name: string;
    email: string;
}

interface Ride {
    id: string;
    pickupLocation: string;
    destination: string;
    status: string;
    completedAt?: string;
}

interface ApiResponse {
    currentRide: Ride | null;
    pastRides: Ride[];
}

const RiderDashboard: React.FC = () => {
    const { user } = useUserStore(); 
    const [currentRide, setCurrentRide] = useState<Ride | null>(null);
    const [pastRides, setPastRides] = useState<Ride[]>([]);

    useEffect(() => {
        if (user) {
            if (user.id) {
                console.log("Fetching rides for rider:", user.id);
                
                axios.post('/api/riderrides', { riderId: user.id })
                    .then((response) => {
                        console.log("API response:", response.data); // Log the API response
                        const { currentRide, pastRides }: ApiResponse = response.data;

                        setCurrentRide(currentRide);
                        setPastRides(pastRides);
                    })
                    .catch((error) => {
                        console.error('Failed to fetch rides:', error.response?.data || error.message);
                    });
            } else {
                console.warn("User ID is not available."); // Log only if user is defined but ID is not
            }
        }
    }, [user]);

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-r from-black to-gray-900">
            {/* Sidebar */}
            <div className="lg:w-1/4 bg-gray-800 p-6 shadow-lg rounded-r-lg lg:rounded-lg lg:rounded-l-none">
                <h2 className="text-3xl text-white font-bold mb-6">Rider Dashboard</h2>
                <nav>
                    <ul>
                        <li className="text-gray-300 hover:text-white mb-4 transition duration-300">
                            <a href="/rider/current-rides">Current Rides</a>
                        </li>
                        <li className="text-gray-300 hover:text-white mb-4 transition duration-300">
                            <a href="/rider/past-rides">Past Rides</a>
                        </li>
                        <li className="text-gray-300 hover:text-white mb-4 transition duration-300">
                            <a href="/rider/profile">Profile</a>
                        </li>
                        <li className="text-gray-300 hover:text-white mb-4 transition duration-300">
                            <a href="/rider/settings">Settings</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl lg:text-4xl text-white font-bold">Welcome, {user?.name || 'Rider'}!</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-300">
                        Notifications
                    </button>
                </div>

                {/* Current Rides Section */}
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl text-white mb-4">Current Ride</h2>
                    {currentRide ? (
                        <div className="bg-gray-600 p-4 rounded-lg mb-4 shadow transition duration-300 hover:bg-gray-500">
                            <h3 className="text-xl text-white font-semibold">{currentRide.destination}</h3>
                            <p className="text-gray-300">Pickup Location: {currentRide.pickupLocation}</p>
                            <p className="text-gray-300">Status: {currentRide.status}</p>
                        </div>
                    ) : (
                        <p className="text-gray-300">No current rides available.</p>
                    )}
                </div>

                {/* Past Rides Section */}
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl text-white mb-4">Past Rides</h2>
                    {pastRides.length > 0 ? (
                        pastRides.map((ride) => (
                            <div key={ride.id} className="bg-gray-600 p-4 rounded-lg mb-4 shadow transition duration-300 hover:bg-gray-500">
                                <h3 className="text-xl text-white font-semibold">{ride.destination}</h3>
                                <p className="text-gray-300">Pickup Location: {ride.pickupLocation}</p>
                                <p className="text-gray-300">Date: {new Date(ride.completedAt || '').toLocaleDateString()}</p>
                                <p className="text-gray-300">Status: Completed</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300">No past rides available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;
