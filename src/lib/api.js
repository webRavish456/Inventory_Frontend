const getBaseUrl = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export function getApiUrl(path) {
  const base = getBaseUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function fetchWithAuth(path, options = {}) {
  const url = path.startsWith("http") ? path : getApiUrl(path);
  const token =
    typeof window !== "undefined" && localStorage.getItem("inventory_admin_token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  return res;
}

export async function loginAdmin(email, password) {
  const res = await fetch(getApiUrl("/auth/admin/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}
