import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

async function handleRequest(req: NextRequest) {
  // 1. Check for Secret Key
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('Stripe secret key is not set in environment variables.');
    return NextResponse.json({ error: 'Server configuration error: Missing Stripe secret key.' }, { status: 500 });
  }

  // 2. Initialize Stripe within the handler
  let stripe: Stripe;
  try {
    stripe = new Stripe(secretKey, {
      typescript: true,
    });
    console.log('Stripe initialized successfully.');
  } catch (initError: unknown) {
    console.error('Stripe initialization failed:', initError);
    const message = (initError instanceof Error) ? initError.message : 'Unknown initialization error';
    return NextResponse.json({ error: `Stripe initialization failed: ${message}` }, { status: 500 });
  }

  try {
    // Read the amount from the request body
    const body = await req.json();
    const amountInCents = body.amount;

    // Validate the amount received from the frontend
    if (typeof amountInCents !== 'number' || amountInCents <= 0 || !Number.isInteger(amountInCents)) {
      console.error('Invalid amount received:', amountInCents);
      return NextResponse.json({ error: 'Invalid donation amount provided.' }, { status: 400 });
    }

    // Basic sanity check for amount (e.g., less than $2,000)
    if (amountInCents > 200000) { // $2,000.00
      console.error('Excessive amount received:', amountInCents);
      return NextResponse.json({ error: 'Donation amount is too large.' }, { status: 400 });
    }

    // Determine base URL based on environment
    const environment = process.env.NODE_ENV;
    const productionUrl = process.env.PRODUCTION_URL || 'https://averyforok.com'; // Your production URL
    const developmentUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const baseUrl = environment === 'production' ? productionUrl : developmentUrl;

    // 3. Define URLs
    const successUrl = `${baseUrl}/thank-you`;
    const cancelUrl = `${baseUrl}/`;

    console.log(`Base URL: ${baseUrl}`);
    console.log(`Creating Stripe session for amount: ${amountInCents} cents`);
    // 4. Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Campaign Donation',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log('Stripe session created:', session.id);
    // 5. Return Session ID
    return NextResponse.json({ id: session.id }, { status: 200 });

  } catch (error: unknown) {
    // Check for JSON parsing errors specifically
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
        console.error('Failed to parse request body as JSON:', error);
        return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
    }
    console.error('Error creating Stripe session:', error);
    // Provide more context if possible
    const errorMessage = (error instanceof Error) ? error.message : 'Failed to create checkout session';
    return NextResponse.json({ error: `Stripe session creation failed: ${errorMessage}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    return handleRequest(req);
} 