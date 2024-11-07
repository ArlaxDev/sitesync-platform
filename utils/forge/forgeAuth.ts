import axios from 'axios';

export async function authenticateForge(): Promise<string> {
  const clientId = process.env.FORGE_CLIENT_ID;
  const clientSecret = process.env.FORGE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET in environment variables');
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  // Add required scopes for bucket creation
  params.append('scope', 'data:read data:write data:create bucket:create bucket:read');

  try {
    const response = await axios.post(
      'https://developer.api.autodesk.com/authentication/v2/token',
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw new Error('Failed to authenticate with Autodesk Forge');
  }
}



