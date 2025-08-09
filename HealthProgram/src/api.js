// src/api.js
const API_BASE = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE =", API_BASE); // sanity check in the browser console

export async function uploadXray(file) {
  const formData = new FormData();
  formData.append("image", file); // must match IFormFile image

  const res = await fetch(`${API_BASE}/Predict/Upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json(); // { Cluster, MinDistance, IsAnomaly }
}
