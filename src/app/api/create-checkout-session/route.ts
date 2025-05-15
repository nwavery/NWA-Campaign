import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe client at module scope
const secretKey = process.env.STRIPE_SECRET_KEY;
let stripe: Stripe | undefined;
let stripeInitializationError: Error | null = null;

if (secretKey) {
  try {
    stripe = new Stripe(secretKey, {
      typescript: true,
      // Consider adding apiVersion if you want to pin to a specific Stripe API version
      // apiVersion: '2023-10-16', 
    });
    console.log('Stripe client initialized at module scope.');
  } catch (e) {
    stripeInitializationError = e instanceof Error ? e : new Error('Unknown Stripe initialization error');
    console.error('Stripe client initialization failed at module scope:', stripeInitializationError);
  }
} else {
  console.error('Stripe secret key is not set in environment variables. Stripe client not initialized.');
  // Set a generic error if key is missing, so handleRequest can check stripeInitializationError
  stripeInitializationError = new Error('Server configuration error: Missing Stripe secret key.');
}

async function handleRequest(req: NextRequest) {
  // 1. Check if Stripe client was initialized successfully
  if (!stripe || stripeInitializationError) {
    const errorMessage = stripeInitializationError ? 
      (stripeInitializationError.message.includes('Missing Stripe secret key') ? 
        stripeInitializationError.message : 
        `Stripe initialization failed: ${stripeInitializationError.message}`) :
      'Stripe client not available.'; // Fallback, should be caught by !secretKey earlier
    
    console.error(errorMessage); // Log the specific initialization error or missing key error
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  // 2. Process the request (amount validation, session creation)
  try {
    const body = await req.json();
    const amountInCents = body.amount;

    if (typeof amountInCents !== 'number' || amountInCents <= 0 || !Number.isInteger(amountInCents)) {
      console.error('Invalid amount received:', amountInCents);
      return NextResponse.json({ error: 'Invalid donation amount provided.' }, { status: 400 });
    }

    if (amountInCents > 200000) { // $2,000.00
      console.error('Excessive amount received:', amountInCents);
      return NextResponse.json({ error: 'Donation amount is too large.' }, { status: 400 });
    }

    const environment = process.env.NODE_ENV;
    const productionUrl = process.env.PRODUCTION_URL || 'https://averyforok.com';
    const developmentUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const baseUrl = environment === 'production' ? productionUrl : developmentUrl;

    const successUrl = `${baseUrl}/thank-you`;
    const cancelUrl = `${baseUrl}/`;

    console.log(`Base URL: ${baseUrl}`);
    console.log(`Creating Stripe session for amount: ${amountInCents} cents`);
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
    return NextResponse.json({ id: session.id }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
        console.error('Failed to parse request body as JSON:', error);
        return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
    }
    console.error('Error creating Stripe session:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Failed to create checkout session';
    return NextResponse.json({ error: `Stripe session creation failed: ${errorMessage}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    return handleRequest(req);
} 