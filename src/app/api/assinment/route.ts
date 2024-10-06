// pages/api/rides/assign.ts
import connectDb from '@/lib/dbconnect';
import RideModel from '@/model/Ride';
import UserModel from '@/model/User';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

connectDb();

const getLocationCoordinates = async (location: string) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'YourAppName/1.0' // Nominatim requires a User-Agent header
            }
        });

        const data = response.data;
        if (data.length > 0) {
            const { lat, lon } = data[0];
            return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        } else {
            throw new Error("Location not found");
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        throw new Error("Could not fetch location coordinates");
    }
};

// Function to calculate distance (Haversine formula)
const haversineDistance = (coords1: number[], coords2: number[]) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km

    const lat1 = toRad(coords1[1]);
    const lon1 = toRad(coords1[0]);
    const lat2 = toRad(coords2[1]);
    const lon2 = toRad(coords2[0]);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

export async function POST(request: NextRequest) {
    try {
        const { rideId } = await request.json();

        // Validate input
        if (!rideId) {
            return NextResponse.json(
                { error: 'rideId is required' },
                { status: 400 }
            );
        }

        // Find the ride
        const ride = await RideModel.findById(rideId);
        if (!ride) {
            return NextResponse.json(
                { error: 'Ride not found' },
                { status: 404 }
            );
        }
        if (ride.status !== 'Pending') {
            return NextResponse.json(
                { error: 'Ride is not in pending state' },
                { status: 400 }
            );
        }

        // Get pickup location coordinates
        const pickupCoordinates = await getLocationCoordinates(ride.pickupLocation);

        // Fetch all active riders
        const riders = await UserModel.find({ role: 'rider', is_active: true });

        // Find the nearest rider based on coordinates
        const closestRider = riders
            .map(rider => {
                const riderCoords = rider.location?.coordinates;
                if (riderCoords) {
                    const distance = haversineDistance(
                        [pickupCoordinates.longitude, pickupCoordinates.latitude], // Pickup location
                        riderCoords
                    );
                    return { rider, distance };
                }
                return null;
            })
            .filter(item => item !== null)
            .sort((a, b) => a.distance - b.distance) // Sort by distance
            .shift(); // Get the closest rider (first one)

        if (!closestRider) {
            return NextResponse.json(
                { error: 'No available riders found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Closest rider fetched successfully',
            rider: closestRider.rider,
            pickupCoordinates, // Optionally return pickup coordinates
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error assigning rider:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
