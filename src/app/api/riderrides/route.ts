import connectDb from '@/lib/dbconnect';
import RideModel from '@/model/Ride';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        console.log('Connecting to the database...');
        await connectDb();
        console.log('Database connection successful.');

        const { riderId } = await request.json();
        console.log(`Received riderId: ${riderId}`);

        // Validate input
        if (!riderId) {
            return NextResponse.json(
                { error: 'riderId is required' },
                { status: 400 }
            );
        }

        // Find all rides by this rider
        console.log(`Finding rides for rider with ID: ${riderId}`);
        const rides = await RideModel.find({ riderId });
        
        if (rides.length === 0) {
            return NextResponse.json(
                { message: 'No rides found for this rider' },
                { status: 404 }
            );
        }

        // Categorize rides into current and past
        const currentRides = rides.filter(ride => ride.status !== 'Completed'); // Returns all ongoing rides
        console.log("Current rides:", currentRides);
        
        const pastRides = rides.filter(ride => ride.status === 'Completed');
        console.log("Past rides:", pastRides);
        
        return NextResponse.json({
            message: 'Rides fetched successfully',
            currentRides,   // Return all ongoing rides as an array
            pastRides,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching rides for rider:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
