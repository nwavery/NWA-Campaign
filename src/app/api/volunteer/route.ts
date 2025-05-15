import { NextRequest, NextResponse } from 'next/server';
import { google, Auth } from 'googleapis';
import { z } from 'zod';

// Define the schema for the request body
const volunteerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name must be 100 characters or less" }),
  email: z.string().email({ message: "Invalid email address" }),
  // Basic US ZIP code validation (5 digits or 5+4 digits)
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code format" }),
  // Phone is optional, but if provided, validate basic format (allowing spaces, dashes, parens)
  // Adjust regex as needed for stricter validation
  phone: z.string().max(20, { message: "Phone number seems too long" }).optional().or(z.literal('')),
});

// Function to get Google Sheets API client
async function getSheetsClient() {
    // GOOGLE_APPLICATION_CREDENTIALS environment variable should point to the JSON key file.
    // The googleapis library automatically picks it up.
    // 1. Create Auth Client (Credentials loaded automatically)
    const auth = new google.auth.GoogleAuth({
        // No need to specify credentials here if GOOGLE_APPLICATION_CREDENTIALS is set
        scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Scope required for Sheets API
    });

    const authClient = await auth.getClient();

    // 2. Initialize Sheets API
    const sheets = google.sheets({
        version: 'v4',
        auth: authClient as Auth.OAuth2Client // Explicitly cast the auth client
    });
    return sheets;
}

export async function POST(req: NextRequest) {
    // Basic validation: Check required ENV variables
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const sheetRange = process.env.GOOGLE_SHEET_RANGE; // e.g., 'Sheet1!A1' or 'Volunteers!A1'
    if (!sheetId || !sheetRange) {
        console.error('Google Sheet ID or Range not set in environment variables.');
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    try {
        const body = await req.json();
        
        // Validate the request body using the schema
        const validationResult = volunteerSchema.safeParse(body);

        if (!validationResult.success) {
            // Log the validation errors
            console.error('Volunteer API Validation Errors:', validationResult.error.flatten());
            // Return a 400 error with specific field errors
            return NextResponse.json(
                { 
                    message: 'Invalid input data', 
                    errors: validationResult.error.flatten().fieldErrors 
                }, 
                { status: 400 }
            );
        }

        // Use the validated data
        const { name, email, phone, zip } = validationResult.data;

        // Get authenticated Sheets client
        const sheets = await getSheetsClient();

        // Prepare data for the new row
        const newRow = [
            name,
            email,
            phone || '', // Use validated phone or empty string
            zip,          // Use zip (it's required now)
            new Date().toISOString(), // Add a timestamp
        ];

        console.log(`Appending to Sheet ID: ${sheetId}, Range: ${sheetRange}`);

        // Append data to the sheet
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: sheetRange, // Append to the specified sheet/tab
            valueInputOption: 'RAW', // Treat input as raw strings, do not parse formulas
            insertDataOption: 'INSERT_ROWS', // Insert new rows
            requestBody: {
                values: [newRow],
            },
        });

        console.log('Google Sheets API response:', response.data);

        // Removed console.log of data itself
        return NextResponse.json({ message: 'Sign-up successful! Thank you for joining us.' }, { status: 200 });

    } catch (error: unknown) {
        // Handle JSON parsing errors separately from Zod errors if needed
        if (error instanceof SyntaxError && error.message.includes('JSON')) {
            console.error('Failed to parse request body as JSON:', error);
            return NextResponse.json({ message: 'Invalid request format.' }, { status: 400 });
        }
        // Handle other errors (like Google API errors)
        console.error('Volunteer API Error:', error);
        let errorMessage = 'An unexpected error occurred processing the sign-up.';
        if (typeof error === 'object' && error !== null) {
            const maybeApiError = error as { response?: { data?: { error?: { message?: string } } }; message?: string };
            if (maybeApiError.response?.data?.error?.message) {
                 errorMessage = `Google Sheets API Error: ${maybeApiError.response.data.error.message}`;
            } else if (maybeApiError.message) {
                errorMessage = maybeApiError.message;
            }
        } else if (typeof error === 'string') {
             errorMessage = error;
        }
        return NextResponse.json({ message: 'Failed to process sign-up', error: errorMessage }, { status: 500 });
    }
} 