import { z } from 'zod';

const VehicleDetailsSchema = z.object({
    type: z.string().optional(),
    registration_number: z.string().optional(),
    model: z.string().optional(),
});

const SignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().nonempty("Phone number is required"),
    role: z.enum(['customer', 'rider']),
    location: z.object({
        latitude: z.number().optional(),
        longitude: z.number().optional(),
    }).optional(),
    vehicle_details: VehicleDetailsSchema.optional().refine(
        (data) => {
            // Check if the vehicle type is provided
            if (data?.type) {
                // If type is provided, registration number must also be provided
                return data.registration_number !== undefined;
            }
            return true; // Validation passes if type is not provided
        },
        {
            message: "Registration number is required if vehicle type is provided.",
        }
    ),
    ratings: z.array(z.number().min(1).max(5)).optional(),
    is_active: z.boolean().optional(),
});
