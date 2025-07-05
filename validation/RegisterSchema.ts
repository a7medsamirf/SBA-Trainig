
import { z } from "zod"; 

const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
   .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
     message: "Password must contain at least one special character"
    }),

  confirmPassword: z
  .string()
  .min(1, { message: "Confirm Password must be at least 6 characters long" }),

}).refine(input => input.password === input.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
  // This will set the error on the confirmPassword field
});

// Define the type for the form inputs using zod's infer utility
type RegisterType = z.infer<typeof RegisterSchema>;

/* type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}; */

export { RegisterSchema, type  RegisterType };
