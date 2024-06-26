import { z } from 'zod';

export const passwordSchema = z.object({
    newPassword: z.string().min(6).refine((password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSynbol = /[^A-Za-z0-9]/.test(password);
    
        return hasUpperCase && hasLowerCase && hasNumber && hasSynbol;
      }, {
        message: "Password must contain at least one uppercase ,  one lowercase letter , one number and one symbol."
      }),
    confirmNewPassword: z.string().min(6),
    password: z.string().min(6),
})