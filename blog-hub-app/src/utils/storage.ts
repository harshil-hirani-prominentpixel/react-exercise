export function readLocal<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeLocal<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

