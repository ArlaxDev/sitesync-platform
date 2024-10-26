interface FormData {
  name: string;
  company: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
}

// Modify ValidationErrors type to have a Record<string, string> structure
export type ValidationErrors = Record<string, string>;

export const validateFormData = (data: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name) errors.name = "Contact name is required.";
  if (!data.company) errors.company = "Company name is required.";
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) errors.email = "Valid email is required.";
  if (!data.password) {
    errors.password = "Password is required.";
  } else {
    if (data.password.length < 8) errors.password = "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(data.password)) errors.password = "Password must contain an uppercase letter.";
    if (!/\d/.test(data.password)) errors.password = "Password must contain a number.";
    if (!/[!@#$%^&*]/.test(data.password)) errors.password = "Password must contain a special character.";
  }

  return errors;
};

export const isFormValid = (errors: ValidationErrors) => Object.keys(errors).length === 0;

