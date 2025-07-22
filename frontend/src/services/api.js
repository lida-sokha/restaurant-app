const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchMenuItems() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${API_URL}/api/menu`, {
      signal: controller.signal,
      credentials: 'include' // Needed if using cookies/auth
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      // Enhanced error handling
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (err) {
    // More specific error messages
    if (err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw new Error(err.message || 'Network request failed');
  }
}