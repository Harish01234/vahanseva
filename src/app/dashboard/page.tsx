'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '@/store/userstore';

// Updated Ride interface to include _id
interface Ride {
    _id: string; // Use _id to match your API response
    pickupLocation: string;
    dropoffLocation: string;
    rideType: string;
    status: string;
    bookedAt: string;
}

interface ApiResponse {
    currentRides: Ride[];
    pastRides: Ride[];
}

const RiderDashboard: React.FC = () => {
    const { user } = useUserStore(); 
    const [currentRides, setCurrentRides] = useState<Ride[]>([]);
    const [pastRides, setPastRides] = useState<Ride[]>([]);

    useEffect(() => {
        if (user?.id) {
            console.log("Fetching rides for rider:", user.id);
            axios.post('/api/riderrides', { riderId: user.id })
                .then((response) => {
                    console.log("API response:", response.data); 
                    const { currentRides, pastRides }: ApiResponse = response.data; 

                    // Set currentRides with the correct structure
                    setCurrentRides(currentRides.map(ride => ({ 
                        _id: ride._id, // Use _id directly from the API
                        pickupLocation: ride.pickupLocation,
                        dropoffLocation: ride.dropoffLocation,
                        rideType: ride.rideType,
                        status: ride.status,
                        bookedAt: ride.bookedAt,
                    })));
                    setPastRides(pastRides);
                })
                .catch((error) => {
                    console.error('Failed to fetch rides:', error.response?.data || error.message);
                });
        } else {
            console.warn("User ID is not available."); 
        }
    }, [user]); 

    const handleAcceptRide = (rideId: string) => {
        // Handle ride acceptance logic here
        console.log("Accepting ride with ID:", rideId);
        axios.put('/api/enroute', { rideId }).then((response) => {
            console.log("Ride accepted successfully:", response.data);
        }).catch((error) => {
            console.error('Failed to accept ride:', error.response?.data || error.message);
        })
        // You can make an API call to accept the ride
    };

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
                    <h2 className="text-2xl text-white mb-4">Current Rides</h2>
                    {currentRides.length > 0 ? (
                        currentRides.map((ride) => (
                            <div key={ride._id} className="bg-gray-600 p-4 rounded-lg mb-4 shadow transition duration-300 hover:bg-gray-500 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <h3 className="text-xl text-white font-semibold">{ride.dropoffLocation}</h3>
                                    <p className="text-gray-300">Pickup Location: {ride.pickupLocation}</p>
                                    <p className="text-gray-300">Status: {ride.status}</p>
                                    <p className="text-gray-300">Ride Type: {ride.rideType}</p>
                                </div>
                                <button 
                                    onClick={() => handleAcceptRide(ride._id)} 
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-500 transition duration-300 ml-4"
                                >
                                    Accept
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300">No current rides available.</p>
                    )}
                </div>

                {/* Past Rides Section */}
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl text-white mb-4">Past Rides</h2>
                    {pastRides.length > 0 ? (
                        pastRides.map((ride) => (
                            <div key={ride._id} className="bg-gray-600 p-4 rounded-lg mb-4 shadow transition duration-300 hover:bg-gray-500">
                                <h3 className="text-xl text-white font-semibold">{ride.dropoffLocation}</h3>
                                <p className="text-gray-300">Pickup Location: {ride.pickupLocation}</p>
                                <p className="text-gray-300">Date: {new Date(ride.bookedAt).toLocaleDateString()}</p>
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
