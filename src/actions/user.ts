import { z } from 'zod';
import { type InsertUser } from '@/db/schema';
import { createUser } from '@/db/queries/user';

// Form validation
const UserRegistrationSchema = z.object({
  name: z.string().min(3, { message: 'Minimum length of name is 3' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  password: z.string().min(3, { message: 'Minimum length of password is 3' }),
});

export async function registerUser(formData: FormData) {
  // Get raw form data
  const rawData = {
    name: formData.get('name')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  };

  // Validation
  const validated = UserRegistrationSchema.safeParse({
    name: rawData.name,
    email: rawData.email,
    password: rawData.password,
  });

  if (!validated.success) {
    console.error('❌ Form validation error');
    console.error(validated.error);
    return;
  }

  console.log('✅ Registration OK');
}
