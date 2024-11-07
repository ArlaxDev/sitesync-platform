import { NextResponse } from 'next/server';
import { authenticateForge } from '@/utils/forge/forgeAuth';

export async function POST(request: Request) {
  const { urn } = await request.json();
  const token = await authenticateForge();

  if (!token) {
    console.error("Failed to authenticate with Autodesk Forge.");
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }

  const response = await fetch(`https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error("Error fetching model GUID:", response.statusText);
    return NextResponse.json({ error: "Failed to fetch model GUID" }, { status: response.status });
  }

  const data = await response.json();
  const modelGuid = data.data.metadata[0]?.guid;
  return NextResponse.json({ modelGuid });
}
