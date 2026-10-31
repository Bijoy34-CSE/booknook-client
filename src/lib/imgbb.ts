export async function uploadToImgbb(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload is not set up yet. Please add the imgbb key.");

  const body = new FormData();
  body.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body,
  });
  const data = await res.json();
  if (!res.ok || !data?.data?.display_url) {
    throw new Error("Image upload failed. Please try another image.");
  }
  return data.data.display_url as string;
}