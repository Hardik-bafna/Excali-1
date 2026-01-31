import {z} from "zod";
export const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(1, "First name required"),
    lastName: z.string().min(1, "Last name required"),
  });
  
  export const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
  export const CreateRoomSchema = z.object({
    name : z.string().min(3,"Must be at least 3 characters long").max(20)
  })