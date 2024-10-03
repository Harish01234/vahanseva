import React from 'react';

const RiderDashboard = () => {
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
                    <h1 className="text-3xl lg:text-4xl text-white font-bold">Welcome, Rider!</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-300">
                        Notifications
                    </button>
                </div>

                {/* Current Rides Section */}
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl text-white mb-4">Current Rides</h2>
                    {/* Example Ride Card */}
                    <div className="bg-gray-600 p-4 rounded-lg mb-4 shadow transition duration-300 hover:bg-gray-500">
                        <h3 className="text-xl text-white font-semibold">Ride to Downtown</h3>
                        <p className="text-gray-300">Pickup Location: Central Park</p>
                        <p className="text-gray-300">Status: En Route</p>
                    </div>
                    <div className="bg-gray-600 p-4 rounded-lg mb-4 shadow transition duration-300 hover:bg-gray-500">
                        <h3 className="text-xl text-white font-semibold">Ride to Airport</h3>
                        <p className="text-gray-300">Pickup Location: City Center</p>
                        <p className="text-gray-300">Status: Pending</p>
                    </div>
                </div>

                {/* Past Rides Section */}
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl text-white mb-4">Past Rides</h2>
                    <div className="bg-gray-600 p-4 rounded-lg mb-4 shadow transition duration-300 hover:bg-gray-500">
                        <h3 className="text-xl text-white font-semibold">Ride to Mall</h3>
                        <p className="text-gray-300">Date: October 1, 2024</p>
                        <p className="text-gray-300">Status: Completed</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;
