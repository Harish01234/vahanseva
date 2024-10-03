// BookRide.jsx
'use client';
import { useState } from "react";

export default function BookRide() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [rideType, setRideType] = useState("Bike");

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    const rideDetails = {
      pickupLocation,
      dropoffLocation,
      rideType,
    };

    console.log("Booking ride with details: ", rideDetails);
    // Send rideDetails to backend
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Book a Ride</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pickup Location */}
          <div>
            <label className="block text-gray-300 mb-2">Pickup Location</label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pickup location"
              required
            />
          </div>

          {/* Dropoff Location */}
          <div>
            <label className="block text-gray-300 mb-2">Dropoff Location</label>
            <input
              type="text"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter dropoff location"
              required
            />
          </div>

          {/* Ride Type */}
          <div>
            <label className="block text-gray-300 mb-2">Ride Type</label>
            <select
              value={rideType}
              onChange={(e) => setRideType(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="Bike">Bike</option>
              <option value="Auto">Auto</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold hover:from-blue-500 hover:to-green-400 transition duration-300"
            >
              Confirm Ride
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
