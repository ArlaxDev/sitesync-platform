// /api/tools/analyzer/get-object-tree/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { urn, modelGuid, token } = await request.json();

  const response = await axios.get(
    `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${modelGuid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.data || !response.data.data) {
    console.error("Error fetching object tree:", response.statusText);
    return NextResponse.json({ error: "Failed to fetch object tree" }, { status: response.status });
  }

  const objectTree = response.data.data.objects;
  return NextResponse.json({ objectTree });
}
