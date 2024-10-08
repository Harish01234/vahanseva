'use client';
import { useUserStore } from "@/store/userstore";
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function BookRide() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [rideType, setRideType] = useState("bike");
  const { user } = useUserStore();
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user id is defined
    if (!user?.id) {
      console.error("User ID is not available.");
      return;
    }

    const rideDetails = {
      customerId: user.id,
      pickupLocation,
      dropoffLocation,
      rideType,
    };

    try {
      const response = await axios.post("/api/rides", rideDetails);
      
      console.log("Ride booked successfully:", response.data.ride._id);

      const response2 = await axios.post('/api/assinment', {rideId: response.data.ride._id});
      console.log("Ride assigned successfully:", response2.data);
      
      // Update user store
      
      // Redirect after successful booking
      router.push(`/user/${user.id}`);
    } catch (error) {
      console.error("Error booking ride:", error);
    }

    
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
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
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
