import { z } from 'zod';

export interface LoginCredentials {
  username: string;
  pin: string;
}

export interface PasswordResetCredentials {
  username: string;
  oldPin: string;
  email: string;
  newPin: string;
}

export interface SecurityAnswers {
  mothersMaidenName: string;
  highSchool: string;
  firstSchool: string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
  created_at?: string;
  pin?: string;
  email?: string;
  failedAttempts?: number;
}

export interface LoginAttempt {
  id?: number;
  username: string;
  pin: string;
  timestamp: string;
  success: boolean;
  page: string;
  error?: string;
  action?: 'login' | 'account_creation' | 'recovery_attempt' | 'password_reset';
  ip?: string;
  securityAnswers?: SecurityAnswers;
  recoveryInfo?: {
    type: 'email' | 'drivers_license';
    value: string;
    state?: string;
    birthday: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface UserWithPin extends User {
  pin: string;
  created_at: string;
}

export const RecoverySchema = z.object({
  type: z.enum(['email', 'drivers_license']),
  value: z.string().min(1),
  state: z.string().optional(),
  birthday: z.string().min(1)
});

export const PasswordResetSchema = z.object({
  username: z.string().min(1),
  oldPin: z.string().min(5).max(11),
  email: z.string().email(),
  newPin: z.string().min(5).max(11)
});

export type RecoveryInfo = z.infer<typeof RecoverySchema>;
export type PasswordReset = z.infer<typeof PasswordResetSchema>;