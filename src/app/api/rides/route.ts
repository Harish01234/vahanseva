// pages/api/rides/index.ts
import connectDb from '@/lib/dbconnect';
import RideModel from '@/model/Ride';
import { NextRequest, NextResponse } from 'next/server';

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { customerId, pickupLocation, dropoffLocation, rideType } = reqBody;

        // Validation
        if (!customerId || !pickupLocation || !dropoffLocation || !rideType) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 } // Use 400 for bad request
            );
        }

        // Create a new ride
        const newRide = new RideModel({
            customerId,
            pickupLocation,
            dropoffLocation,
            rideType,
            status: 'Pending', // Set initial status to Pending
        });

        await newRide.save();

        return NextResponse.json({
            message: 'Ride created successfully',
            success: true,
            ride: newRide, // Return the created ride object
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error during ride creation:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const customerId = url.searchParams.get('customerId');

        // Build the query for rides with 'Pending' status
        const query: Record<string, any> = { status: 'Pending' };

        // If customerId is provided, add it to the query
        if (customerId) {
            query.customerId = customerId; // Ensure customerId is valid if necessary
        }

        // Fetch rides based on the query
        const availableRides = await RideModel.find(query);

        // Check if rides are available and return them
        if (availableRides.length === 0) {
            return NextResponse.json({ message: 'No pending rides found' }, { status: 200 });
        }

        return NextResponse.json({ rides: availableRides }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error fetching rides:", error);

        // Ensure error response is consistent
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
        }
    }
}