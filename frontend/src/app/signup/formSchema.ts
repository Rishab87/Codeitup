import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).refine((password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSynbol = /[^A-Za-z0-9]/.test(password);
    
        return hasUpperCase && hasLowerCase && hasNumber && hasSynbol;
      }, {
        message: "Password must contain at least one uppercase ,  one lowercase letter , one number and one symbol."
      }),
    confirmPassword: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
})