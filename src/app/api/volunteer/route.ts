import { NextRequest, NextResponse } from 'next/server';
import { google, Auth } from 'googleapis';

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
        const { name, email, phone, zip } = body;

        // Basic validation (expand as needed)
        if (!name || !email || !zip) {
            return NextResponse.json({ message: 'Name, Email, and Zip are required' }, { status: 400 });
        }

        // Get authenticated Sheets client
        const sheets = await getSheetsClient();

        // Prepare data for the new row
        const newRow = [
            name,
            email,
            phone || '', // Use empty string if phone is not provided
            zip,          // Use zip (it's required now)
            new Date().toISOString(), // Add a timestamp
        ];

        console.log(`Appending to Sheet ID: ${sheetId}, Range: ${sheetRange}`);

        // Append data to the sheet
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: sheetRange, // Append to the specified sheet/tab
            valueInputOption: 'USER_ENTERED', // Interpret data as if user typed it
            insertDataOption: 'INSERT_ROWS', // Insert new rows
            requestBody: {
                values: [newRow],
            },
        });

        console.log('Google Sheets API response:', response.data);

        // Removed console.log of data itself
        return NextResponse.json({ message: 'Sign-up successful! Thank you for joining us.' }, { status: 200 });

    } catch (error: any) {
        console.error('Volunteer API Error (Google Sheets):', error);
        let errorMessage = 'An unexpected error occurred processing the sign-up.';
        // Check for specific Google API errors if needed
        if (error.response?.data?.error?.message) {
            errorMessage = `Google Sheets API Error: ${error.response.data.error.message}`;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        return NextResponse.json({ message: 'Failed to process sign-up', error: errorMessage }, { status: 500 });
    }
} 