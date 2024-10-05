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

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const customerId = url.searchParams.get('customerId'); // Optional query param

        // Fetch available rides (e.g., rides with 'Pending' status)
        const query: any = { status: 'Pending' };
        if (customerId) {
            query.customerId = customerId; // Filter by customer ID if provided
        }

        const availableRides = await RideModel.find(query);

        return NextResponse.json(availableRides, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching rides:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
