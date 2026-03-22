const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function uploadToCloudinary(
  file: File,
  token: string
): Promise<string> {
  // Step 1: Get signed upload params from backend
  const sigRes = await fetch(`${API_URL}/upload/signature`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!sigRes.ok) throw new Error("Failed to get upload signature");

  const { signature, timestamp, cloudName, apiKey, folder } =
    await sigRes.json();

  // Step 2: Upload to Cloudinary with signed params
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);
  formData.append("timestamp", String(timestamp));
  formData.append("api_key", apiKey);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!uploadRes.ok) throw new Error("Image upload failed");

  const data = await uploadRes.json();
  return data.secure_url;
}
