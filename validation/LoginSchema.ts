
import { z } from "zod"; 

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })

});

// Define the type for the form inputs using zod's infer utility
type LoginType = z.infer<typeof LoginSchema>;

/* type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}; */

export { LoginSchema, type  LoginType };