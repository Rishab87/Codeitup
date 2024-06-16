import { z } from 'zod';

export const passwordSchema = z.string().min(6).refine((password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
}, {
  message: "Password must contain at least one uppercase, one lowercase letter, one number, and one symbol."
});
