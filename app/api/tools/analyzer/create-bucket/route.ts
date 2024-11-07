import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { authenticateForge } from '@/utils/forge/forgeAuth';

export async function POST(req: NextRequest) {
  const bucketKey = req.nextUrl.searchParams.get('bucketKey')?.toLowerCase();

  if (!bucketKey) {
    return NextResponse.json({ error: 'Bucket key is required' }, { status: 400 });
  }

  const token = await authenticateForge();

  try {
    // Check if the bucket already exists
    const checkResponse = await axios.get(
      `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // If the bucket exists, return a response with a message
    if (checkResponse.status === 200) {
      return NextResponse.json({ message: 'Bucket already exists' }, { status: 200 });
    }
  } catch (error) {
    // If the error is a 404, this means the bucket does not exist, so we proceed to create it
    if (axios.isAxiosError(error) && error.response?.status !== 404) {
      console.error('Error checking bucket existence:', error);
      return NextResponse.json({ error: 'Error checking bucket existence' }, { status: 500 });
    }
  }

  // Proceed to create the bucket if it doesn't exist
  try {
    const createResponse = await axios.post(
      'https://developer.api.autodesk.com/oss/v2/buckets',
      {
        bucketKey,
        access: 'full',
        policyKey: 'transient',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(createResponse.data);
  } catch (error) {
    console.error('Error creating bucket:', error);
    return NextResponse.json({ error: 'Failed to create bucket' }, { status: 500 });
  }
}
