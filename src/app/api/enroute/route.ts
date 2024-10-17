import connectDb from '@/lib/dbconnect';
import RideModel from '@/model/Ride';
import { NextRequest, NextResponse } from 'next/server';

connectDb();

export async function PUT(request: NextRequest) {
    try {
        const { rideId } = await request.json(); // Extracting rideId from the request body

        if (!rideId) {
            return NextResponse.json({ error: 'Ride ID is required' }, { status: 400 });
        }

        const updatedRide = await RideModel.findByIdAndUpdate(
            rideId,
            { status: 'En Route' },
            { new: true }
        );

        if (!updatedRide) {
            return NextResponse.json({ error: 'Ride not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Ride status updated to En Route',
            success: true,
            ride: updatedRide,
        }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating ride status:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        // Query the database to find rides that are 'En Route'
        const enRouteRides = await RideModel.find({ status: 'En Route' });

        // If no rides are found, return an empty array
        if (enRouteRides.length === 0) {
            return NextResponse.json({
                message: 'No rides are currently En Route',
                rides: [],
            }, { status: 200 });
        }

        // Return the rides that are En Route
        return NextResponse.json({
            message: 'En Route rides fetched successfully',
            rides: enRouteRides,
        }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching En Route rides:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}