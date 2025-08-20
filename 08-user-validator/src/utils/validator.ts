export default function (name: string, age: string) {
  const convertedAge = +age;
  if (name.trim().length < 1) {
    return { message: "name should be not empty", result: false };
  } else if (!/^[a-zA-Z\s]*$/.test(name)) {
    return { result: false, message: "only alphabets are allowed" };
  } else if (isNaN(convertedAge)) {
    return { message: "invaid age", result: false };
  } else if (convertedAge < 1) {
    return { message: "must be positive age", result: false };
  } else {
    return { result: true };
  }
}
