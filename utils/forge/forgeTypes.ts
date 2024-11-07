// types/forge.ts
export interface ForgeElement {
  objectId: number;
  objectName: string;
  objectCategory: string;
  properties: Record<string, unknown>; // Use more specific properties if known
}

export interface ForgeMetadataResponse {
  data: {
    metadata: Array<{
      guid: string;
      name: string;
    }>;
  };
}

export interface ForgeHierarchyResponse {
  data: {
    collection: ForgeElement[];
  };
}
