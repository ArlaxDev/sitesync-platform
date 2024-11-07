import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { authenticateForge } from '@/utils/forge/forgeAuth';
import { encodeBase64 } from '@/utils/forge/base64Helper';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as Blob;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const token = await authenticateForge();
  const bucketKey = 'sitesync_analyzer_bucket';
  const objectKey = `uploaded_revit_model_${Date.now()}.rvt`;

  try {
    // Check if bucket exists; if not, create it
    const bucketExists = await checkOrCreateBucket(bucketKey, token);

    if (!bucketExists) {
      return NextResponse.json({ error: 'Failed to create or verify bucket' }, { status: 500 });
    }

    // Upload the file directly to the Forge bucket
    const uploadUrl = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectKey}`;
    const uploadResponse = await axios.put(uploadUrl, Buffer.from(await file.arrayBuffer()), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/octet-stream',
      },
    });

    // Get the URN from the uploaded file response
    const urn = encodeBase64(uploadResponse.data.objectId);

    // Start the translation job
    const translateResponse = await axios.post(
      'https://developer.api.autodesk.com/modelderivative/v2/designdata/job',
      {
        input: { urn },
        output: {
          formats: [
            {
              type: 'svf',
              views: ['2d', '3d'],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (translateResponse.data.result !== 'success') {
      return NextResponse.json({ error: 'Failed to start translation' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'File uploaded and translation started',
      urn,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error in upload-and-translate:', error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
  }
}

// Helper function to check or create a bucket
async function checkOrCreateBucket(bucketKey: string, token: string): Promise<boolean> {
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

    if (checkResponse.status === 200) {
      console.log('Bucket already exists.');
      return true;
    }
  } catch (error) {
    // If the error is a 404, the bucket does not exist, so we proceed to create it
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      try {
        // Create the bucket
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
        console.log('Bucket created successfully:', createResponse.data);
        return true;
      } catch (createError) {
        console.error('Error creating bucket:', createError);
        return false;
      }
    } else {
      console.error('Error checking bucket existence:', error);
      return false;
    }
  }

  return false;
}
