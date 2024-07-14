import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import Cors from 'cors';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  const email = req.query.email as string; // Assume email is passed as a query parameter
  if (!email) {
    return res.status(400).send('Email query parameter is required');
  }

  try {
    console.log(`Fetching data for email: ${email}`);
    const { data: userData, error } = await supabase
      .from("users")
      .select("name, date_of_birth")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).send('Internal Server Error');
    }

    if (!userData) {
      return res.status(404).send('User not found');
    }

    // Respond with the user's name and date of birth
    res.json({ name: userData.name, date_of_birth: userData.date_of_birth });

  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send('Internal Server Error');
  }
}
