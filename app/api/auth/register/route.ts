import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { validateFormData, isFormValid } from '@/utils/validation/account';

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    // Re-validate the incoming data on the backend
    const errors = validateFormData(body);
    if (!isFormValid(errors)) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Initialize Supabase client with cookie access configured as a callback
    const supabaseServer = createRouteHandlerClient({
      cookies: () => cookies()
    });
    //const supabaseServer = await createClientServer();

    // Register the user in Supabase Auth
    const { email, password } = body;
    const { data: authData, error: authError } = await supabaseServer.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Error creating user in Supabase Auth:', authError);
      return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }

    // Retrieve user ID to link in the `company` schema table
    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json({ message: 'User ID not found after registration' }, { status: 500 });
    }

    // Insert user data into the `company.users` table
    /*
    const { name, company, phone, role } = body;
    const { error:dbError } = await supabaseServer.schema('company').from(
      'users').insert({
        id: userId,
        name,
        company,
        email,
        phone,
        role,
      });

    if (dbError) {
      console.error('Error inserting user data into company table:', dbError);
      return NextResponse.json({ message: 'Error saving user data' }, { status: 500 });
    }
      */

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

