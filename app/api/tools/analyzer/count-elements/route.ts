import { NextResponse } from 'next/server';
import { authenticateForge } from '@/utils/forge/forgeAuth'; // Make sure this path matches your project structure

// Helper function to process the object tree and count elements
function processElementData(data: any) {
  // Define a type for the element details we want to collect
  type ElementDetail = {
    id: number;
    name: string;
    location: string;
  };

  // Define the structure for elements with arrays of ElementDetail
  const elements: {
    doors: ElementDetail[];
    walls: ElementDetail[];
    windows: ElementDetail[];
  } = {
    doors: [],
    walls: [],
    windows: [],
  };

  // Recursive function to traverse the tree and classify elements
  function traverseObjects(objects: any[]) {
    for (const obj of objects) {
      const name = obj.name?.toLowerCase() || '';

      // Classify based on name or other identifying properties
      if (name.includes('door')) {
        elements.doors.push({
          id: obj.objectid,
          name: obj.name,
          location: obj.properties?.Location || 'N/A',
        });
      } else if (name.includes('wall')) {
        elements.walls.push({
          id: obj.objectid,
          name: obj.name,
          location: obj.properties?.Location || 'N/A',
        });
      } else if (name.includes('window')) {
        elements.windows.push({
          id: obj.objectid,
          name: obj.name,
          location: obj.properties?.Location || 'N/A',
        });
      }

      // If the current object has child objects, recursively traverse them
      if (obj.objects) {
        traverseObjects(obj.objects);
      }
    }
  }

  // Start traversing from the root of the object tree
  if (data?.data?.objects) {
    traverseObjects(data.data.objects);
  }

  // Convert elements object to an array format with counts and details
  return Object.entries(elements).map(([type, items]) => ({
    type,
    count: items.length,
    details: items,
  }));
}

// The main POST handler for the route
export async function POST(request: Request) {
  const { urn, modelGuid } = await request.json();
  const token = await authenticateForge(); // Get the token using your Forge authentication helper

  if (!token) {
    console.error("Failed to authenticate with Autodesk Forge.");
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }

  // Step 1: Fetch the object tree from Autodesk Forge
  const objectTreeUrl = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${modelGuid}/properties`;
  const response = await fetch(objectTreeUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error("Error fetching object tree:", response.statusText);
    return NextResponse.json({ error: "Failed to fetch object tree" }, { status: response.status });
  }

  const data = await response.json();
  
  // Process the object tree data to count elements
  const elementInfo = processElementData(data);

  return NextResponse.json({ elementInfo });
}
