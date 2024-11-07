// /api/tools/analyzer/poll-translation-status.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { authenticateForge } from '@/utils/forge/forgeAuth';

export async function GET(req: NextRequest) {
  const urn = req.nextUrl.searchParams.get('urn');

  if (!urn) {
    return NextResponse.json({ error: 'URN is required' }, { status: 400 });
  }

  const token = await authenticateForge();

  try {
    const response = await axios.get(
      `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error checking translation status:', error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Failed to check translation status' }, { status: 500 });
    }
  }
}
