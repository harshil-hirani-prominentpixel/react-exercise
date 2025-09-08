import * as Yup from "yup";
import type { IUser } from "../types/user";

export const getRegisterValidationSchema = (users: IUser[]) =>
  Yup.object().shape({
    firstName: Yup.string()
      .trim("First name cannot be empty or spaces")
      .required("First name is required")
      .test("not-only-spaces", "First name cannot be empty", (value) =>
        value ? value.trim().length > 0 : false
      ),

    lastName: Yup.string()
      .trim("Last name cannot be empty or spaces")
      .required("Last name is required")
      .test("not-only-spaces", "Last name cannot be empty", (value) =>
        value ? value.trim().length > 0 : false
      ),

    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is required")
      .test("unique-email", "Email ID is already registered", function (value) {
        if (!value) return true;
        return !users.some((user) => user.email === value);
      }),

    mobileNumber: Yup.string()
      .trim()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required")
      .test(
        "unique-mobile",
        "Mobile number is already registered",
        function (value) {
          if (!value) return true;
          return !users.some((user) => String(user.mobileNumber) === value);
        }
      ),

    password: Yup.string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .test("not-only-spaces", "Password cannot be empty", (value) =>
        value ? value.trim().length > 0 : false
      ),

    role: Yup.mixed<IUser["role"]>()
      .oneOf(["user", "admin"])
      .required("Role is required"),
  });
