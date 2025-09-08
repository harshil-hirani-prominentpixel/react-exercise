export function genId(prefix = ""): string {
  return (
    prefix +
    Date.now().toString(36) +
    Math.floor(Math.random() * 1e6).toString(36)
  );
}

export function gen15DigitAccountNumber(): number {
  const min = 100_000_000_000_000;
  const max = 999_999_999_999_999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function nowISOString(): string {
  return new Date().toISOString();
}
