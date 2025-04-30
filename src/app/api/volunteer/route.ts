import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interests } = body;

    // Basic validation (can be expanded)
    if (!name || !email) {
      return NextResponse.json({ message: 'Name and Email are required' }, { status: 400 });
    }

    // In a real application, you would save this data to a database,
    // send it to a CRM, or trigger an email notification.
    console.log('Volunteer Sign-up Received:', { name, email, phone, interests });

    return NextResponse.json({ message: 'Sign-up successful!' }, { status: 200 });

  } catch (error) {
    console.error('Volunteer API Error:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }
    return NextResponse.json({ message: 'Failed to process sign-up', error: errorMessage }, { status: 500 });
  }
} 