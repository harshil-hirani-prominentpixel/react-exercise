export function validateEmailProminent(email: string): string | null {
  if (!email) return "Email is required";

  const regex = /^[A-Za-z0-9._%+-]+@prominentpixel\.com$/i;

  if (!regex.test(email)) {
    return "Email must be a valid @prominentpixel.com address";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";

  const regex =
    /^(?=.{8,16}$)(?=.*[A-Za-z])(?=.*\d)(?=.*@)[A-Z][A-Za-z\d@]{7,15}$/;

  if (!regex.test(password)) {
    return "Password must start with a capital letter, contain letters, numbers, an '@', and be 8–16 characters long";
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
