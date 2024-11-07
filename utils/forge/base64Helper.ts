export function encodeBase64(urn: string): string {
  return Buffer.from(urn).toString('base64').replace(/=+$/, ''); // URL-safe Base64 encoding
}
