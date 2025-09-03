export function validateEmailProminent(email: string): string | null {
  if (!email) return "Email is required";
  if (!email.includes("@")) return "Email is invalid";
  if (!email.toLowerCase().endsWith("@prominentpixel.com")) {
    return "Email must end with @prominentpixel.com";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  const regex = /^[A-Z][A-Za-z0-9]{7,15}$/;
  if (!regex.test(password)) {
    return "Password must start with a capital letter, contain letters & numbers, 8–16 chars";
  }
  return null;
}

export function validateConfirmPassword(
  password: string,
  confirm: string
): string | null {
  if (!confirm) return "Confirm password is required";
  return password === confirm ? null : "Passwords do not match";
}
